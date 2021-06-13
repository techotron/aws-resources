package controllers

import "github.com/gin-gonic/gin"

// MessageHandler is a wrapper for the gin message interface
func MessageHandler(message string) gin.H {
	return gin.H{
		"message": message,
	}
}
