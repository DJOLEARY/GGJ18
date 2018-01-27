from tornado import websocket, web, ioloop, httpserver
import tornado
import json

session = {}
WAITING_FOR_PLAYERS = 0
GAME_IN_PROGRESS = 1
game_state = WAITING_FOR_PLAYERS

# tring to get this to work
nextNumberToAssign = 1

# nextNumberToAssign = 1
# When player opens a browser assign them a number and increment the nextNumberToAssign
# Just have 4 people for now

class WSHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        #player_address = str(self.request.remote_ip)  + ':' + str(self.stream.socket.getpeername()[1])
        #session[player_address] = self
        pass

    def send_to_other_player(self, message):
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
                    value.write_message(str(nextNumberToAssign))    
                    nextNumberToAssign = nextNumberToAssign + 1
                
            print("Players so far " + str(nextNumberToAssign - 1))
            print("-----------")
        else:
            print("No more players allowed to join!!! :( ")

    def on_message(self, message):
        print("on_message!!!!!!")
        # json.loads() returns a dict
        msg = json.loads(message)
        if msg == "join":
            print(msg)
            self.joinGame()
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