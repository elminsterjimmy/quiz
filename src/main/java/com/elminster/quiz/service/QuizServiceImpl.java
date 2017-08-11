package com.elminster.quiz.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.elminster.common.util.FileUtil;

@Service
public class QuizServiceImpl implements QuizService {
  
  private static final String QUIZ_DIR = "conf/";
  
  private static final File QUIZ_BASE_DIR = new File(QUIZ_DIR);
  
  private static final String QUIZ_FILE_FORMAT = "quiz";

  @Override
  public String loadQuizzes(String name) throws QuizServiceException {
    try {
      String json = FileUtil.readFile2String(QUIZ_DIR + name);
      return json;
    } catch (IOException e) {
      throw new QuizServiceException(e);
    }
  }

  @Override
  public List<String> getAllQuizzes() throws QuizServiceException {
    if (!QUIZ_BASE_DIR.exists()) {
      throw new QuizServiceException("Quiz dir not found!");
    }
    List<String> quizzes = new ArrayList<>();
    quizzes.addAll(retrieveAllQuizzes(QUIZ_BASE_DIR));
    if (quizzes.isEmpty()) {
      throw new QuizServiceException("No quiz file found!");
    }
    return quizzes;
  }

  private Collection<? extends String> retrieveAllQuizzes(File dir) throws QuizServiceException {
    File[] files = dir.listFiles();
    List<String> quizzes = new ArrayList<>();
    if (null != files) {
      for (File file : files) {
        if (file.isDirectory()) {
          quizzes.addAll(retrieveAllQuizzes(file));
        } else {
          if (isQuizzFile(file)) {
            try {
              String relativePath = FileUtil.getRelativePath(file.getAbsolutePath(), QUIZ_BASE_DIR.getAbsolutePath());
              quizzes.add(relativePath);
            } catch (IOException e) {
              throw new QuizServiceException(e);
            }
          }
        }
      }
    }
    return quizzes;
  }

  private boolean isQuizzFile(File file) {
    return QUIZ_FILE_FORMAT.equals(FileUtil.getFileFarmat(file.getAbsolutePath()));
  }

}
