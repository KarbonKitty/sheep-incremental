# Sheep Incremental

## Local build

To test Sheep Incremental locally, you will need to install [Node.js](https://nodejs.org/en/download/). Any recent version should do. Make sure to install npm, too.

After that, open you favorite command-line tool (personally, I use [Cmder](http://cmder.net/)), navigate to place where you want the code stored, and perform following commands:

1. Clone the repo: 
```
git clone https://github.com/KarbonKitty/sheep-incremental.git
```
2. Enter the newly-created folder:
```
cd sheep-incremental/
```

3. Make sure you are on the development branch:
```
git checkout dev
```
4. Install all the necessary packages:
```
npm install
```
5. Install node http server (this will install it globally, and it only needs to be done once):
```
npm install -g http-server
```
6. Build the game:
```
npm run build
```
7. Serve the game locally:
```
http-server -p 9999
```

After that, you should be able to navigate to address localhost:9999 in your browser of choice and see your very own, locally running copy of the Sheep Incremental!