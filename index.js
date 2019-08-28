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

const os = require( 'os' );

const browserSync = require( 'browser-sync' );

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

browserSync

	.create()

	.init({

		proxy: {
			target: `https://${SHOP_NAME}?preview_theme_id=${SHOP_THEME_ID}`,
			proxyReq: [

				( proxyReq, req, res ) => {

					// Shopify sites with redirection enabled for custom domains force redirection
					// to that domain. `?_fd=0` prevents that forwarding.
					// ?pb=0 hides the Shopify preview bar

					const prefix = req.url.indexOf( '?' ) > -1 ? '&' : '?';

					const queries = '_fd=0&pb=0';

					req.url = `${req.url}${prefix}${queries}`;

				}

			]
		},
		port: PORT || 8080,
		https: {

			cert: path.resolve( os.homedir(), '.localhost_ssl/server.crt' ),
			key: path.resolve( os.homedir(), '.localhost_ssl/server.key' )

		},
		open: true

	})

;