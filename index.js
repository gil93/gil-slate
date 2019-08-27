// set environment
// set password, themeId, and store

// get

// create

// dev/watch (update)
// deploy (update)

// delete

require( 'dotenv' ).config();

const fs = require( 'fs' );

const path = require( 'path' );

const https = require( 'https' );

const os = require( 'os' );

const express = require( 'express' );

const proxy = require( 'express-http-proxy' );

const {

	PORT,
	SHOP_NAME,
	SHOP_THEME_ID

} = process.env;

const cert = fs

	.readFileSync( path.resolve( os.homedir(), '.localhost_ssl/server.crt' ), 'utf8' )

;

const key = fs

	.readFileSync( path.resolve( os.homedir(), '.localhost_ssl/server.key' ), 'utf8' )

;

const app = express();

app

	.get( '/', proxy( `https://${SHOP_NAME}?preview_theme_id=${SHOP_THEME_ID}`, {

		proxyReqPathResolver: req => {

			// Shopify sites with redirection enabled for custom domains force redirection
			// to that domain. `?_fd=0` prevents that forwarding.
			// ?pb=0 hides the Shopify preview bar

			const prefix = req.url.indexOf( '?' ) > -1 ? '&' : '?';

			const queries = '_fd=0&pb=0';

			return `${req.url}${prefix}${queries}`;

		}

	}))

;

https

	.createServer( { cert, key }, app )

	.listen( PORT || 8080 )

;