from tornado import websocket, web, ioloop, httpserver
import tornado
import json

session = {}
WAITING_FOR_PLAYERS = 0
GAME_IN_PROGRESS = 1
game_state = WAITING_FOR_PLAYERS

nextNumberToAssign = 1
spacesInGame = 8

class WSHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        #player_address = str(self.request.remote_ip)  + ':' + str(self.stream.socket.getpeername()[1])
        #session[player_address] = self
        pass

    def send_to_all_player(self, message):
        print("send_to_all_player")
        #iterate through the connections
        for key, value in session.items():
            value.write_message(message);

    def send_to_other_player(self, message):
        print("send_to_other_player")
        #iterate through the connections
        for key, value in session.items():
            #if the key is not the socket the message came in on - what does that mean?
            if(key != self.get_player_address()):
                value.write_message(message);

    def joinGame(self):
        #iterate through the connections
        print("-----------")
        if len(session) < 8:
            player_address = str(self.request.remote_ip)  + ':' + str(self.stream.socket.getpeername()[1])
            session[player_address] = self
            
            for key, value in session.items():
                #if the key is not the socket the message came in on - what does that mean?
                if(key == self.get_player_address()):
                    global nextNumberToAssign
                    global spacesInGame
                    joinGameInfo = {}
                    joinGameInfo["event_type"] = "join_game_info"
                    joinGameInfo["players_number"] = nextNumberToAssign
                    session[player_address] = self
                    value.write_message(joinGameInfo) 
                    nextNumberToAssign = nextNumberToAssign + 1
                    spacesInGame = spacesInGame - 1
                    lobbyGameInfo = {}
                    lobbyGameInfo["event_type"] = "lobby_game_info"
                    lobbyGameInfo["spaces_left"] = spacesInGame
                    self.send_to_all_player(lobbyGameInfo)
                
            print("Players so far " + str(nextNumberToAssign - 1))
            print("Spaces in game left " + str(spacesInGame))
            print("-----------")
        else:
            print("No more players allowed to join!!! :( ")

    def on_message(self, message):
        # json.loads() returns a dict
        msg = json.loads(message)
        if "gameType" in msg:
            if msg["gameType"] == "join_music_game":
                self.joinGame()
            # @todo(darren): Make it work for the shitty charades game! -_-
            #else if msg["gameType"] == "join_charades_game":
                #print("trying to join the charades game?! Yeah not ready there bud")
        else:
            self.send_to_other_player(message)

    def on_close(self):
        # @todo(darren): Do player leaving the game or lobby
        pass

    def get_player_address(self):
        return str(self.request.remote_ip) + ':' + str(self.stream.socket.getpeername()[1])

app= tornado.web.Application([
    #map the handler to the URI named "test"
    (r'/wstest', WSHandler),
])

if __name__ == '__main__':
    server_port=8080
    app.listen(server_port)
    ioloop.IOLoop.instance().start()