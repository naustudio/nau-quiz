/**
 * Quiz statistics & ranking utilities.
 * Authors: GP.
 * Version: 1.0
 * Release Date: 08-Apr-2014
 */

/**
 * Module dependencies.
 */

var async = require('async'),
    config = require('../config/config'),
    models = require('../models'),
    misc = require('../utils/misc'),
    quiz = require('../utils/quiz');

/**
 * Gets the total number of questions in today's quiz.
 *
 * @param {Function} callback.
 * @api private
 */

function getDailyQuestionsCount(fn) {
    var start_day = new Date();
    start_day.setHours(0, 0, 0, 0);
    var query = {
        date: {
            $gte: start_day
        }
    };
    models.Question.count(query, function(err, count) {
        return fn(null, count);
    });
}

/**
 * Gets all unique users who've attended today's quiz.
 *
 * @param {Function} callback.
 * @api public
 */

function getDailyAttendees(fn) {
    var start_day = new Date();
    start_day.setHours(0, 0, 0, 0);
    var query = {
        date: {
            $gte: start_day
        }
    };
    models.QuizHistory.count(query).distinct('user_id', function(err, count) {
        return fn(null, count);
    });
};

/**
 * Gets the day's average score.
 *
 * @param {Function} callback.
 * @api public
 */

function getDailyAverageScore(fn) {
    var user_points = 0;
    getDailyQuestionsCount(function(err, count) {
        getDailyAttendees(function(err, results) {
            async.eachSeries(results, function(item, callback) {
                quiz.getResults(item, function(err, results) {
                    user_points += results.total_points;
                    return callback();
                });
            }, function() {
                return fn(null, user_points / results.length);
            });
        });
    });
};

/**
 * Gets the day's total number of perfect scores.
 *
 * @param {Function} callback.
 * @api public
 */

function getDailyPerfectScoresCount(fn) {
    var result_count = 0;
    getDailyAttendees(function(err, results) {
        async.eachSeries(results, function(item, callback) {
            quiz.getResults(item, function(err, results) {
                if (results['total_points'] == results['total_questions']) {
                    result_count++;
                }
                return callback();
            });
        }, function() {
            return fn(null, result_count);
        });
    });
}

/**
 * Gets the day's quickest quiz.
 * This function makes sure we pick a user's record for calculating total response time only
 * when the user has taken all questions.
 *
 * @param {Function} callback.
 * @api public
 */

function getDailyQuickestQuiz(fn) {
    var final_result = 0;
    getDailyAttendees(function(err, results) {
        async.eachSeries(results, function(item, callback) {
                quiz.getResults(item, function(err, results) {
                    if (results['total_points'] == results['total_questions']) {
                        async.eachSeries(results, function(time_item, callback) {
                            final_result += time_item['response_time'];
                            callback();
                        });
                    }
                    return callback();
                });
            },
            function() {
                return fn(null, final_result);
            });
    });
}

/**
 * Module exports.
 */

module.exports = {
    getDailyAttendees: getDailyAttendees,
    getDailyAverageScore: getDailyAverageScore,
    getDailyPerfectScoresCount: getDailyPerfectScoresCount,
    getDailyQuickestQuiz: getDailyQuickestQuiz
}