package controllers

import (
	"net/http"

	"github.com/techotron/aws-resources/backend/constants"
	"github.com/techotron/aws-resources/backend/services"
	log "github.com/techotron/aws-resources/backend/log"

	"github.com/gin-gonic/gin"
)


// GetResources returns resources for a specified team
func GetResources(c *gin.Context) {
	log.Debug("GetResources: ", c)
	team := c.Param("team")
	region := c.Param("region")

	r, err := services.GetResources(team, region)
	if err != nil {
		log.Errorf("Server error: %s", err)
		c.JSON(http.StatusInternalServerError, MessageHandler(constants.MessageInternalError))
		return
	}

	c.JSON(http.StatusOK, r)
}
