package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"landchain/api"
	"landchain/blockchain"
	"landchain/db"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	db.InitDB()
	blocks, err := db.LoadAllBlocks()
	if err != nil {
		log.Fatalf("Failed to load blocks from DB: %v", err)
	}

	blockchain.LoadBlockchainFromDB(blocks)
	
	log.Println("Blockchain integrity validated successfully")
	blockchain.InitGenesisBlock()

	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		log.Fatal("API_KEY is not set in .env")
	}

	http.Handle("/api/v1/transfer", api.APIKeyAuthMiddleware(http.HandlerFunc(api.AddTransferHandler)))

	log.Println("Blockchain service running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
