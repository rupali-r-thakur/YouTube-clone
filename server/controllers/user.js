import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    // console.log(req.params.id);
    // console.log(req.user.id);
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      console.log(req.body);
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "you can update only your account!"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    // console.log(req.params.id);
    // console.log(req.user.id);
    try {
      await User.findByIdAndDelete(req.params.id);
      // console.log(req.body);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "you can delete only your account!"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { subscribedUsers: req.user.id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subcription successfull");
  } catch (error) {
    next(error);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { subscribedUsers: req.user.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubcription successfull");
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { disLikes: id },
    });
    res.status(200).json("The video has been liked");
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  try {
    const id = req.user.id;
    const videoId = req.params.videoId;
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { disLikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disLiked");
  } catch (error) {
    next(error);
  }
};
