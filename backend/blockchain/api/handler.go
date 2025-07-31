package api

import (
	"encoding/json"
	"net/http"

	"landchain/blockchain"
	"landchain/db"
	"landchain/models"
	"log"
)

func AddTransferHandler(w http.ResponseWriter, r *http.Request) {
	var transfer models.LandTransfer
	if err := json.NewDecoder(r.Body).Decode(&transfer); err != nil {
		http.Error(w, "invalid input", http.StatusBadRequest)
		return
	}

	block := blockchain.AddBlock(transfer)
	err := db.InsertBlock(block)
	if err != nil {
		log.Printf("DB Insert error: %v\n", err) 
		http.Error(w, "DB error", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(block)
}

