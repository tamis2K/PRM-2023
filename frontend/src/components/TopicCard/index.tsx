import { useEffect, useState } from "react";
import { IComment, ILikes, ITopic } from "../../@types";
import TopicCardActions from "../TopicCardActions";
import TopicCardBody from "../TopicCardBody";
import TopicCardHeader from "../TopicCardHeader";
import { Alert, Snackbar } from "@mui/material";
import { createComment, getCommentByTopic, createLike } from "../../services";
import { useAuth } from "../../hook/useAuth";
import TopicComment from "../TopicComment";

type TopicCardProps = {
  topic: ITopic;
};

function TopicCard({ topic }: TopicCardProps) {
  //USER
  const { user } = useAuth();

  //STATES - CONTROL
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  //COMMENTS
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState<IComment>({} as IComment);
  const [comments, setComments] = useState<IComment[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const handleClickComment = () => {
    setShowComments(!showComments);
  };
  const postComment = async (contentText: string): Promise<void> => {
    const commentForm: IComment = {
      user: user,
      topic: topic,
      content: contentText,
    };

    createComment(commentForm)
      .then((result) => {
        setComment(result.data);
        setTotalComments(totalComments + 1);

        setComments([...comments, result.data]);

        setMessageSuccess("Comentário efetuado com sucesso!");
        setTimeout(() => {
          setMessageSuccess("");
        }, 5000);
      })
      .catch((error) => {
        setMessageError(error.message);
      });
  };
  //REPOSTS

  //LIKES
  const [showLikes, setShowLikes] = useState(false);
  const [like, setLike] = useState<ILikes>({} as ILikes);
  const [likes, setLikes] = useState<ILikes[]>([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const handleClickLikes = () => {
    setShowLikes(!showLikes);
  };
  const postLike = async (): Promise<void> => {
    const likeForm: ILikes = {
      user: user,
      comment: comment,
    };
    createLike(likeForm).then((result) => {
      setLike(result.data);
      setTotalLikes(totalLikes + 1);

      setLikes([...likes, result.data]);
    });
  };

  //EFFECT
  useEffect(() => {
    getCommentByTopic(topic)
      .then((result) => {
        const dados: IComment[] = result.data;
        setComments(dados);
        setTotalComments(dados.length);

        //verifica se o usuario comentou este topic
        const found = dados.find((item) => item.user?.id == user?.id);
        if (found) {
          setComment(found);
        }
      })
      .catch((error) => {
        setMessageError(error.messege);
      });
  }, []);

  return (
    <div id="topic-card">
      <TopicCardHeader createdAt={topic.createdAt} owner={topic.owner} />
      <TopicCardBody content={topic.content} />
      <TopicCardActions
        commented={Boolean(comment.user)}
        totalComments={totalComments}
        clickComment={handleClickComment}
        likends={Boolean(like.user)}
        totalLikes={totalLikes}
        clickLikes={handleClickLikes}
      />

      {showComments && (
        <TopicComment comments={comments} postComment={postComment} />
      )}

      <Snackbar
        open={Boolean(messageError)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          elevation={6}
          variant="filled"
          onClose={() => setMessageError("")}
        >
          {messageError}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(messageSuccess)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          elevation={6}
          variant="filled"
          onClose={() => setMessageSuccess("")}
        >
          {messageSuccess}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TopicCard;
