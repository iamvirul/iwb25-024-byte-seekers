import ballerina/websocket;
import ballerina/log;
import backend.common as Common;

public class ConnectionStore {
    private map<websocket:Caller> clients = {};

    public function addClient(string userId, websocket:Caller caller) {
        self.clients[userId] = caller;
    }

    public function removeClient(string userId) {
        _ = self.clients.remove(userId);
    }

    public function broadcast(Common:socketMessage message) {
        foreach var [_, activeClient] in self.clients.entries() {
            var result = activeClient->writeMessage(message);
            if result is error {
                log:printError("Failed to send message to client", result);
            }
        }
    }
    
}

public  ConnectionStore connectionStore = new;
