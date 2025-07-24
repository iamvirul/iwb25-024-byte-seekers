package models

type LandTransfer struct {
	LandID         int
	FromOwnerID    *int
	ToOwnerID      int
	TransferDate   string 
	VerifiedBy     string
}

type Block struct {
	Index         int
	Timestamp     string
	LandTransfer  LandTransfer
	Hash          string
	PrevHash      string
}
