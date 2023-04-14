import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const parseFormData = () => upload.array("images");
export const parseAvatar = () => upload.single("image");
