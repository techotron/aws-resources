package main

import (
	"github.com/techotron/aws-resources/backend/api"
	log "github.com/techotron/aws-resources/backend/log"
)

func main() {
	router := api.Setup()

	err := router.Run(":5000")
	if err != nil {
		log.Error(err)
	}
}
