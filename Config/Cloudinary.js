const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.CloudAPIKey,
  api_secret: process.env.CloudAPISecret,
});

var cloudFunctions = {

    /**
     * Uploading the image for the custom recipe.
     * @function
     * @param {ImageData} image - The image being uploaded.
     * @param {String} customRecipeId - The id of the recipe, to be used as a tag.
     */
  UploadImage(image, customRecipeId) {
    return new Promise(function (resolve) {
      cloudinary.uploader.upload(
        image,
        {
          crop: "limit",
          tags: `${customRecipeId}`,
          width: 800,
          height: 800,
        },
        function (error, result) {
          if (error) {
            console.log(error);
            resolve({
              Result: "Error",
              Message: "Error uploading image: " + error,
            });
          }
          console.log(result);
          resolve({ Result: "Success", Message: "Photo Uploaded" });
        }
      );
    });
  },

    /**
     * Getting the image for the custom recipe.
     * @function
     * @param {String} customRecipeId - The id of the recipe, to be used as a tag.
     */
  GetImage(customRecipeId) {
    return new Promise(function (resolve) {
      cloudinary.api.resources_by_tag(`${customRecipeId}`, function (
        error,
        result
      ) {
        if (error) {
          console.log(error);
          resolve({ Result: "Error", Message: "Error getting image: " + err });
        }
        console.log(result);
        resolve({ Result: "Success", Message: result.resources[0].url });
      });
    });
  },

      /**
     * Removing the image for the custom recipe.
     * @function
     * @param {String} customRecipeId - The id of the recipe, to be used as a tag.
     */
  RemoveImage(customRecipeId) {
    return new Promise(function (resolve) {
      cloudinary.api.delete_resources_by_tag(`${customRecipeId}`, function (
        error,
        result
      ) {
        if (error) {
          console.log(error);
          resolve({ Result: "Error", Message: "Error removing image: " + err });
        }
        console.log(result);
        resolve({ Result: "Success", Message: "Photo Deleted" });
      });
    });
  },

    /**
     * Uploading the new image for the custom recipe.
     * @function
     * @param {ImageData} image - The image being uploaded.
     * @param {String} customRecipeId - The id of the recipe, to be used as a tag.
     */
  UpdateImage(image, customRecipeId){
    return new Promise(async function (resolve) {
    imageRemovalStatus = await cloudFunctions.RemoveImage(customRecipeId);
    imageUploadStatus = await cloudFunctions.UploadImage(image,customRecipeId);
    if(imageRemovalStatus.Result === "Success" && imageUploadStatus.Result === "Success"){
      resolve({Result: "Success", Message: "Image Updated"})
    }
    else{
      resolve({Result: "Error", Message: 
      {ImageRemovalStatus: imageRemovalStatus,
         ImageUploadStatus: imageUploadStatus}})
    }
    })
  }
};

module.exports = cloudFunctions;

// async function tester(){
//   var test = await cloudFunctions.UpdateImage("Hungry.jpg", "142")
//   console.log(test);
// }

// tester();