const express = require("express");
require("dotenv").config();
const cors = require("cors");
const sequelize = require("./app/models");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const passport = require("./app/passport");
const authRouter = require("./app/components/auth");
const groupRouter = require("./app/components/group");
const activateRouter = require("./app/components/activate");
const memberRouter = require("./app/components/member");
const userRouter = require("./app/components/user");
const presentationRouter = require("./app/components/presentation");
const slideRouter = require("./app/components/slide");
const User = require("./app/models/user");
const Group = require("./app/models/group");
const Member = require("./app/models/member");
const Presentation = require("./app/models/presentation");
const Slide = require("./app/models/slide");
const Option = require("./app/models/option");
const Collaborator = require("./app/models/collaborator");
const HistoryVote = require("./app/models/historyVote");
const HistoryChat = require("./app/models/historyChat");
const Question = require("./app/models/question");
const presentationService = require("./app/components/presentation/presentationService");
const optionService = require("./app/components/option/optionService");
const historyVoteService = require("./app/components/historyVote/historyVoteService");
const historyChatService = require("./app/components/historyChat/historyChatService");
const questionService = require("./app/components/question/questionService");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({ secret: "my-super-secret-key" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use("/", authRouter);
app.use("/group", groupRouter);
app.use("/activate", activateRouter);
app.use("/member", memberRouter);
app.use("/user", userRouter);
app.use("/presentation", presentationRouter);
app.use("/slide", slideRouter);

//socket
const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
  cors: corsOptions,
});
socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id);

  socket.on("presentationStart", function (presentationData) {
    socket.join(presentationData.presentationId);
    console.log("Joined" + presentationData.presentationId);
  });

  socket.on("changeSlide", async function (changeSlideData) {
    const historyVote = await historyVoteService.historyVoteOfPresentation(changeSlideData.presentationId);
    socketIo
      .to(changeSlideData.presentationId)
      .emit("sendUpdatedSlidePosition", {
        slidePosition: changeSlideData.currentSlide,
        historyVote: historyVote
      });
  });

  socket.on("vote", async function (voteData) {
    const questions = voteData.questions;
    const questionIndex = questions.findIndex(
      (q) => q.id === voteData.questionId
    );
    const options = questions[questionIndex].options;
    let option = "";
    for (let x in options) {
      if (options[x].id === voteData.optionId) {
        options[x].upvote++;
        option = options[x].content;
      }
    }
    //console.log(questions[questionIndex].options);
    socketIo
      .to(voteData.presentationId)
      .emit("sendUpdatedQuestions", { questions });
    await optionService.upvote(voteData.optionId);
    // const user = voteData.user;
    // await historyVoteService.create(user.firstName, user.lastName,user.email, 
    //   voteData.presentationId, voteData.questionId, questions[questionIndex].question, option);
  });

  socket.on("sendMessageClient", async function(messageData) {
    const message = messageData.message;
    const presentation = await presentationService.findById(messageData.presentationId);
    const historyChat = await historyChatService.create(message.firstName, message.lastName, message.email, message.content);
    await presentation.addHistoryChat(historyChat);
    socketIo.to(messageData.presentationId)
      .emit("sendMessageServer", { sender: sender, message: historyChat });
    
  });

  socket.on("postQuestion", async function(questionData) {
    const question = questionData.question;
    const newQuestion = await questionService.create(question.firstName, question.lastName, question.email, question.content);
    const presentation = await presentationService.findById(messageData.presentationId);
    await presentation.addQuestion(newQuestion);
    socketIo.to(questionData.presentationId)
      .emit("sendQuestion", { question: newQuestion });
  });

  socket.on("voteQuestion", async function (voteQuestionData) {
    const questions = voteQuestionData.questions;
    for (let x in questions) {
      if (questions[x].id === voteQuestionData.questionId) {
        questions[x].upvote++;
      }
    }
    socketIo
      .to(voteQuestionData.presentationId)
      .emit("sendUpdatedVoteQuestions", { questions });
    await questionService.upvote(voteQuestionData.questionId);
  });

  socket.on("markQuestion", async function (markQuestionData) {
    const questions = voteQuestionData.questions;
    for (let x in questions) {
      if (questions[x].id === voteQuestionData.questionId) {
        questions[x].isAnswered = !questions[x].isAnswered;
      }
    }
    socketIo
      .to(voteQuestionData.presentationId)
      .emit("sendUpdatedVoteQuestions", { questions });
    await questionService.mark(voteQuestionData.questionId);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });

    sequelize.sync({ force: false, alter: true }).then(() => {
      console.log("Drop and re-sync db.");
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
