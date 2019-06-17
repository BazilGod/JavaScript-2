'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /food/{id}
 */
module.exports = {
    /**
     * summary: Get food by id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200, 404, 500
     * operationId: 
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/food/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        },
        404: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/food/{id}',
                operation: 'get',
                response: '404'
            }, callback);
        },
        500: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/food/{id}',
                operation: 'get',
                response: '500'
            }, callback);
        }
    },
    /**
     * summary: Update food
     * description: 
     * parameters: id, body
     * produces: 
     * responses: 200, 500
     * operationId: 
     */
    put: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/food/{id}',
                operation: 'put',
                response: '200'
            }, callback);
        },
        500: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/food/{id}',
                operation: 'put',
                response: '500'
            }, callback);
        }
    },
    /**
     * summary: Delete food
     * description: 
     * parameters: id
     * produces: 
     * responses: 200, 500
     * operationId: 
     */
    delete: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/food/{id}',
                operation: 'delete',
                response: '200'
            }, callback);
        },
        500: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/food/{id}',
                operation: 'delete',
                response: '500'
            }, callback);
        }
    }
};
