angular.
  module('quiz').factory('requestService', requestService);


function requestService($http, $cookies) {
  var service = {
    request: request
  };
  return service;

  function request(url, method, data, successCallback, failedCallback) {
    if (undefined === method) {
      method = 'GET';
    }
    if (undefined === data) {
      data = {};
    }
    if (undefined === successCallback) {
      successCallback = ajaxSuccess;
    }
    if (undefined === failedCallback) {
      failedCallback = ajaxFailed;
    }
    data._ = (new Date()).getTime();
    return $http({
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data,
    }).then(successCallback)
      .catch(failedCallback);
  }
}

function ajaxSuccess(response) {
  return response;
}

function ajaxFailed(response, status) {
  return response;
}