package models

import "github.com/aws/aws-sdk-go-v2/service/resourcegroupstaggingapi/types"

type ResourcesRow struct {
	ResourceARN		string		`json:"resourceArn"`
	Team			string		`json:"team"`
	Environment		string		`json:"environment"`
	Namespace		string		`json:"namespace"`
	App				string		`json:"app"`
	Pool			string		`json:"pool"`
	ExtraTags		[]types.Tag	`json:"extraTags"`
	Service			string		`json:"service"`
	AccountID		string		`json:"accountId"`
	Resource		string		`json:"resource"`
}

