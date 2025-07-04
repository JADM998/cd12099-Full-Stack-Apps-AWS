import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1

  app.get("/filteredImage", (req, res) => {
    const {image_url} = req.query;
    if(!image_url) return res.status(400).json({message: "image_url query parameter was not provided"});
    const pathsToDelete = [];

    filterImageFromURL(image_url)
      .then((output_path) => {
        pathsToDelete.push(output_path);
        //To wait for the file to be transfered
        setTimeout(() => deleteLocalFiles(pathsToDelete), 15000);
        return res.status(200).sendFile(output_path);
      }).catch((error) => {
        return res.status(422).json({
          message: "Unprocessable Content",
          error: error,
          image_path: image_url
        })
      });
      
  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
