from tornado import websocket, web, ioloop, httpserver
import tornado
import json

session = {}

class WSHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        print("connection opened")
        print("Remote IP: ", self.request.remote_ip)
        print("Port", self.stream.socket.getpeername()[1])
        player_address = str(self.request.remote_ip)  + ':' + str(self.stream.socket.getpeername()[1])
        session[player_address] = self
        pass

    def send_to_other_player(self, message):
        #iterate through the connections
        for key, value in session.items():
            #if the key is not the socket the message came in on - what does that mean?
            if(key != self.get_player_address()):
                value.write_message(message)    

    def on_message(self, message):
        self.send_to_other_player(message)
        pass                        	

    def on_close(self):
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