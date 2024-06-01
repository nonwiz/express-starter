import {app, env, logger} from "@/config";

app.listen(env.PORT, () => {
    logger.info("Starting application.")
})
