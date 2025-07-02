# Full Stack Apps on AWS Project

This is my submission for the Image Processing Microservice project on AWS Beanstalk. The project also contains an image of the AWS elastic beanstalk in the folder `deployment_screenshot`. 


## Project Instructions

To run this project follow this steps:

1. `npm install`
2. `npm run dev`

## Testing

### Localhost
For localhost testing use this url: http://localhost:8082/filteredimage?image_url='imageURL', replace 'imageUrl' with a valid image.

### Elastic Beanstalk.
The domain for beanstalk is this one: http://my-image-processing-microservice-submis.us-east-1.elasticbeanstalk.com?image_url='imageURL'

### Samples
#### Valid responses
1. http://my-image-processing-microservice-submis.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://i.pinimg.com/736x/c6/82/44/c68244f5e077b7f33b627c3afc739f2b.jpg
2. http://my-image-processing-microservice-submis.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg

#### Unprocessable responses
1. http://my-image-processing-microservice-submis.us-east-1.elasticbeanstalk.com/filteredimage?image_url=sometext (422)
2. http://my-image-processing-microservice-submis.us-east-1.elasticbeanstalk.com/filteredimage (400)

## License

[License](LICENSE.txt)
