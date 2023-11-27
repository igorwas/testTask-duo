export const parseResponseToNotification = ( response ) => {
  return { 
    type: !response.error ? 'success' : 'error',
    message: response.error ? `${response.message}(${response.error})` : response.message
  };
}