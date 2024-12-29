export const calculateDistance = (origins, destinations) => {
    const service = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [origins],
          destinations,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            resolve(response.rows[0].elements);
          } else {
            reject(`Error with Distance Matrix API: ${status}`);
          }
        }
      );
    });
  };
  