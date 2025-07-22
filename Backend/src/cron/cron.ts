import cron from "node-cron";
import { Todo } from "../models/todo-model";

export function startTodoCronJobs() {
  // Run every hour at minute 0
  cron.schedule("0 * * * *", async () => {
    try {
      const now = new Date();

      // 24 hours ago
      const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Delete completed todos older than 24h
      const deleteResult = await Todo.deleteMany({
        status: "completed",
        completedAt: { $lte: cutoff },
      });
      console.log(`Cron: Deleted ${deleteResult.deletedCount} completed todos older than 24h`);

      // Update incomplete todos older than 24h to pending
      const updateResult = await Todo.updateMany(
        {
          status: "incomplete",
          createdAt: { $lte: cutoff },
        },
        { $set: { status: "pending" } }
      );
      console.log(`Cron: Updated ${updateResult.modifiedCount} todos from incomplete to pending`);
    } catch (err) {
      console.error("Cron job error:", err);
    }
  });
}
