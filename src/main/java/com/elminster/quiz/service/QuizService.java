package com.elminster.quiz.service;

import java.util.List;

public interface QuizService {

  public String loadQuizzes(String name) throws QuizServiceException;
  
  public List<String> getAllQuizzes() throws QuizServiceException;
}
