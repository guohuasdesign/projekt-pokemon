import express from "express";
import './db/index.ts';
import { userRouter } from './routers/index.ts';
import { errorHandler, notFound } from './middleware/index.ts';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);
// app.use('/battle', battleRouter);
// app.use('/leaderboard', leaderboardRouter);
// app.use('/search', searchRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
