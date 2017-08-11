package com.elminster.quiz.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elminster.common.constants.Constants.EncodingConstants;
import com.elminster.quiz.service.QuizService;
import com.elminster.quiz.service.QuizServiceException;
import com.elminster.web.commons.response.JsonResponse;
import com.elminster.web.commons.response.JsonResponseBuilder;

@RestController
public class QuizController {
  
  private static JsonResponseBuilder jsonResponseBuilder = JsonResponseBuilder.INSTANCE;
  
  @Autowired private QuizService quizService;

  @RequestMapping("/quiz/{name:.+}")
  public JsonResponse quiz(@PathVariable("name") String name, HttpServletResponse httpResponse) {
    JsonResponse response = null;
    try {
      String decoded = URLDecoder.decode(name, EncodingConstants.UTF8);
      String quizesJson = quizService.loadQuizzes(decoded);
      response = jsonResponseBuilder.buildJsonResponse(quizesJson);
    } catch (QuizServiceException | UnsupportedEncodingException e) {
      response = jsonResponseBuilder.buildErrorJsonResponse(e);
      httpResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
    return response;
  }
  
  @RequestMapping("/quizzes")
  public JsonResponse quizzes(HttpServletResponse httpResponse) {
    JsonResponse response = null;
    try {
      List<String> quizzes = quizService.getAllQuizzes();
      response = jsonResponseBuilder.buildJsonResponse(quizzes);
    } catch (QuizServiceException e) {
      response = jsonResponseBuilder.buildErrorJsonResponse(e);
      httpResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
    return response;
  }
}
