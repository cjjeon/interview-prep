import logging
import time

logger = logging.getLogger(__name__)


def setup_logging():
    logging.basicConfig(
        format='[%(asctime)s] %(levelname)s - %(message)s',
        level=logging.INFO
    )


def function_time_logging(func) -> object:
    def wrapper(*args, **kwargs):
        ts = time.time()
        logger.info(f"function '{func.__name__}' started")
        result = func(*args, **kwargs)
        te = time.time()
        logger.info(f"function '{func.__name__}' ended, timed: {round((te - ts) * 1000, 1), 'ms'}")
        return result

    return wrapper
