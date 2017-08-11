package com.elminster.quiz.service;

public class QuizServiceException extends Exception {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  public QuizServiceException(Exception e) {
    super(e);
  }

  public QuizServiceException(String string) {
    super(string);
  }

}
