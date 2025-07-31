package db

import (
	"database/sql"
	"fmt"
	"landchain/models"
	"log"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB

func InitDB() {
	_ = godotenv.Load()

	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		log.Fatal("DB_DSN not set in environment or .env file")
	}

	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Failed to open DB: %v", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatalf("Failed to ping DB: %v", err)
	}

	log.Println("Connected to MySQL successfully")
}

func getLastBlockTx(tx *sql.Tx, landID int) (lastIndex int, lastHash string, err error) {
	query := `SELECT blockIndex, blockHash FROM land_transfer_chain WHERE landsId = ? ORDER BY blockIndex DESC LIMIT 1`
	row := tx.QueryRow(query, landID)

	err = row.Scan(&lastIndex, &lastHash)
	if err == sql.ErrNoRows {
		return 0, "0", nil
	}
	return lastIndex, lastHash, err
}

func InsertBlock(b models.Block) (err error) {
	transfer := b.LandTransfer

	t, err := time.Parse(time.RFC3339, transfer.TransferDate)
	if err != nil {
		return fmt.Errorf("invalid transfer date format: %v", err)
	}
	mysqlDate := t.Format("2006-01-02 15:04:05")

	tx, err := DB.Begin()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %v", err)
	}

	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p) 
		} else if err != nil {
			tx.Rollback()
		} else {
			err = tx.Commit()
		}
	}()

	lastIndex, lastHash, err := getLastBlockTx(tx, transfer.LandID)
	if err != nil {
		return fmt.Errorf("failed to get last block: %v", err)
	}

	b.Index = lastIndex + 1
	b.PrevHash = lastHash

	query := `INSERT INTO land_transfer_chain (
		transferDate, verifiedBy, blockIndex, blockHash, prevBlockHash,
		fromLandOwnersId, toLandOwnersId, landsId
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

	var fromOwner interface{}
	if transfer.FromOwnerID != nil {
		fromOwner = *transfer.FromOwnerID
	} else {
		fromOwner = nil
	}

	_, err = tx.Exec(query,
		mysqlDate,
		transfer.VerifiedBy,
		b.Index,
		b.Hash,
		b.PrevHash,
		fromOwner,
		transfer.ToOwnerID,
		transfer.LandID,
	)

	if err != nil {
		return fmt.Errorf("insert block failed: %v", err)
	}

	return nil
}
