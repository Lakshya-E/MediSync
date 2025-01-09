"""enums.py"""
from enum import Enum
import inspect


class BaseEnum(Enum):
    @classmethod
    def choices(cls):
        members = inspect.getmembers(cls, lambda m: not (inspect.isroutine(m)))
        # filter down to just properties
        props = [m for m in members if not (m[0][:2] == "__")]
        choices = tuple(
            [(p[1].value, p[0])
             for p in props if p[0] not in ["name", "value"]]
        )
        return choices


class ResponseStatus(Enum):
    """Response Status"""
    SUCCESS = 'SUCCESS'
    FAILED = 'FAILED'


class StatusChoices(BaseEnum):
    """Status choices"""
    Active = 'active'
    Inactive = 'inactive'
    Comingsoon = 'coming_soon'


class MessageType(BaseEnum):
    """Message type"""
    BOT = 'bot'
    USER = 'user'
    CODE = 'code'


class PromptType(BaseEnum):
    """Prompt Type"""
    Testcase_generation = 'testcase_generation'
    Testcode_generation = 'pytest_code_generation'
    Testcode_generation_tc = 'testcode_generation'
    Chatbot = 'chatbot'
    Resume_rating  = 'resume_rating'
    Interview_question = 'interview_question_gen'

class ConversationTypeEnum(BaseEnum):
    """Prompt Type"""
    # for TESTCASE GENERATION
    API_SPECIFICATION = 'api_specification'
    PROGRAM_STATEMENT = 'program_statement'
    USER_STORY = 'user_story'
    FUNCTIONAL_SPECITFICATION = 'functional_specification'
    FUNCTIONAL_REQUIREMENT = 'functional_requirement'

    # for CHATBOT
    PDF = "pdf"
    WEBSITE = "website"
    CSV = "csv"
    TEXT = "text"
    YOUTUBE = "youtube"
    LOCAL_VIDEO = "local_video"

    