package services

import (
	"context"
	"strings"
	"strconv"

	log "github.com/techotron/aws-resources/backend/log"
	"github.com/techotron/aws-resources/backend/models"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/resourcegroupstaggingapi"
	"github.com/aws/aws-sdk-go-v2/service/resourcegroupstaggingapi/types"
)

// GetResources queries the AWS resource tagging API and returns resources for a specified team
func GetResources(team string, region string) (allResources []models.ResourcesRow, err error) {

	maxItems := int32(100)

	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(region))
	if err != nil {
		log.Errorf("Failed to load SDK config: %s", err)
		return allResources, err
	}

	svc := resourcegroupstaggingapi.NewFromConfig(cfg)


	paginator := resourcegroupstaggingapi.NewGetResourcesPaginator(svc, &resourcegroupstaggingapi.GetResourcesInput{
		TagFilters: []types.TagFilter{
			types.TagFilter{
				Key: aws.String("team"),
				Values: strings.Fields(team),
			},
		},
		ResourcesPerPage: &maxItems,
	}, func(o *resourcegroupstaggingapi.GetResourcesPaginatorOptions) {
		o.StopOnDuplicateToken = true
	})

	var i int
	for paginator.HasMorePages() {
		i++
		resources, err := paginator.NextPage(context.TODO())
		if err != nil {
			log.Errorf("Failed to list resources for: %s. Error: %s", team, err)
			return nil, err
		}
	
		for _, resource := range resources.ResourceTagMappingList {
			al := models.ResourcesRow{}
			for _, t := range resource.Tags {
				switch *t.Key {
				case "team":
					al.Team = *t.Value
				case "env":
					al.Environment = *t.Value
				case "namespace":
					al.Namespace = *t.Value
				case "app":
					al.App = *t.Value
				case "pool":
					al.Pool = *t.Value
				default:
					al.ExtraTags = append(al.ExtraTags, t)
				}
			}
			al.ResourceARN = *resource.ResourceARN
			allResources = append(allResources, al)
		}

		// The HasMorePages() function is not working as the logic doesn't account for an empty token. I don't know whether this is down to 
		//  how the resource tagging API responds with tokens or some other reason but this break point is a work around until the code is
		//  fixed. The following issue was raised earlier which seems to relate to it: https://github.com/aws/aws-sdk-go-v2/issues/1201
		if *resources.PaginationToken == "" {
			break
		}
		log.Infof("Processed %s pages", strconv.Itoa(i))
	}

	return allResources, err
}
