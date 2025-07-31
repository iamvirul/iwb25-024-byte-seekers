import backend.common as Common;

import ballerina/log;
import ballerina/websocket;

public class LandOwnerConnectionStore {
    private map<websocket:Caller> clients = {};

    public function addClient(string userId, websocket:Caller caller) {
        self.clients[userId] = caller;
    }

    public function removeClient(string userId) {
        _ = self.clients.remove(userId);
    }

    public function broadcast(Common:socketMessage message, string userId) {
        boolean hasKey = self.clients.hasKey(userId);
        if !hasKey {
            return;
        }
        websocket:Caller caller = self.clients.get(userId);
        websocket:Error? writeMessage = caller->writeMessage(message);
        if writeMessage is error {
            log:printError("Failed to send message to client", writeMessage);
        }
    }

}

public LandOwnerConnectionStore landOwnerConnectionStore = new;
