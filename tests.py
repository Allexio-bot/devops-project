import pytest
import src.my_parser as parser
import src.sot_interaction as inter

class TestParser:
    def test_where_is_standard(self):
        input = "where is x"
        assert inter.object_searcher("x") == parser.parser(input)

    def test_help(self):
        assert parser.help_print == parser.parser("help")