from decimal import Decimal
import json

class EnhancedJSONEncoder(json.JSONEncoder):
    """A JSON encoder that handles Decimals."""

    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return super().default(obj)