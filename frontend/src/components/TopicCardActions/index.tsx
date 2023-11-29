import {
  ChatBubble,
  ChatBubbleOutline,
  FavoriteBorder,
  Repeat,
} from "@mui/icons-material";
import { Button } from "@mui/material";

import "./style.css";
import { ITopic } from "../../@types";

type TopicCardActionsProps = {
  likends: boolean;
  commented: boolean;
  totalLikes: number;
  totalComments: number;
  clickComment: () => void;
  clickLikes: () => void;
};
function TopicCardActions({
  likends,
  commented,
  totalComments,
  clickComment,
  totalLikes,
  clickLikes,
}: TopicCardActionsProps) {
  return (
    <div id="topic-card-actions">
      <Button
        variant="text"
        size="small"
        startIcon={commented ? <ChatBubble /> : <ChatBubbleOutline />}
        onClick={clickComment}
      >
        {totalComments}
      </Button>
      <Button variant="text" size="small" startIcon={<Repeat />}>
        23
      </Button>
      <Button
        variant="text"
        size="small"
        startIcon={likends ? <FavoriteBorder /> : <FavoriteBorder />}
        onClick={clickLikes}
      >
        {totalLikes}
      </Button>
    </div>
  );
}

export default TopicCardActions;
