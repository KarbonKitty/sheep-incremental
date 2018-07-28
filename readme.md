# Sheep Incremental

## Local build

To test Sheep Incremental locally, you will need to install [Node.js](https://nodejs.org/en/download/). Any recent version should do. Make sure to install npm, too.

After that, create an empty folder, open you favorite command-line tool (personally, I use [Cmder](http://cmder.net/)), enter the folder you have just created, and perform following commands:

```
$ git clone https://github.com/KarbonKitty/sheep-incremental.git .
$ git checkout dev
$ npm install
$ npm run build
$ http-server -p 9999
```

After that, you should be able to navigate to address localhost:9999 in your browser of choice and see your very own, locally running copy of the Sheep Incremental!