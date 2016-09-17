# Data Push API Server
____
NodeJS Server which serves static JSON flat file. 

Built on top of express framework, server basically sends flatfile in accordance to requested id/filename. Can easily be used for making static content Client Applications. 

## GET /
Returns server welcome message.

## GET /config
This sends config.json file, which serves as application skeleton. it defines all the possible resource. Client is expected to create navigation menu with this. On invoke of any menu item, client needs to send content_id to /content endpoint, which will return the actual data file. 

config.json also have 'type' field, which can define different type of content, which content file might have. Client side needs to handle different 'type' of content.

## GET /content?content_id='12345'
**Required Param:**

content_id : string

This endpoint takes the content_id and look for the 'content_id.json' file in /json/data folder, and sends the flatfile to the client. 

## GET /icon/value
This endpoint sends image resource with filename /icon/value.png. This image can also be defiend in HTML with  src='/icon/home'.

## POST /save
**Required Param:**

id : string
message : string

This is a post method, with 'application/json' payload. Client can call this end point to save data. Currently json content is parsed and saved in the flatfile with UNIX timestamp as the filename. Returns success status and filename as reference.
