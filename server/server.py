#! /usr/bin/env python3.4
# coding: utf-8

import random

import tornado.web
import tornado.websocket
import tornado.ioloop


class BaseWebSocketHandler(tornado.websocket.WebSocketHandler):
    client = 'Client'
    key = None

    def check_origin(self, origin):
        return True

    def open(self):
        self.set_nodelay(True)
        print('# {key} - {client} connected'.format(
            key=self.key,
            client=self.client,
            ))

    def on_message(self, message):
        # print('{:<10}[in]: {}'.format(self.client, message))
        pass

    def on_close(self):
        print('# {key} - {client} disconnected'.format(
            key=self.key,
            client=self.client,
            ))


_desktops = dict()

class Desktop(BaseWebSocketHandler):
    client = 'Desktop'

    def open(self):
        global _desktops
        self.key = random.randint(100, 999)
        while self.key in _desktops:
            self.key = random.randint(100, 999)
        _desktops[self.key] = self
        self.write_message(str(self.key))
        super().open()

    def on_close(self):
        global _desktops
        if self.key in _desktops:
            _desktops.pop(self.key)
        super().on_close()


class Phone(BaseWebSocketHandler):
    client = 'Phone'

    def open(self, key):
        self.key = int(key)
        if self.key not in _desktops:
            self.close(code=1002)
            print('# {key} - Desktop not found'.format(
                key=self.key,
                ))
            return
        super().open()

    def on_message(self, message):
        desctop = _desktops.get(self.key)
        if desctop is not None:
            try:
                desctop.write_message(message)
            except:
                pass
        else:
            self.close(code=1000)
        super().on_message(message)


def main():
    port = 8200
    application = tornado.web.Application([
        (r'/left/(?P<key>\d{3})/', Phone),
        (r'/right/(?P<key>\d{3})/', Phone),
        # (r'/(?P<key>\d*)/', Phone),
        (r'/desktop/', Desktop),
        ])
    application.listen(port, address='0.0.0.0')
    print(' -- Start server on localhost:{} -- '.format(port))
    try:
        tornado.ioloop.IOLoop.instance().start()
    except KeyboardInterrupt:
        pass

if __name__ == '__main__':
    main()

# EOF