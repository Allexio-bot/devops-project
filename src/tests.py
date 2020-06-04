import my_parser as parser
import sot_interaction as inter

class TestParser:
    def test_where_is_standard(self):
        input = "where is x"
        assert inter.object_searcher("x") == parser.parser(input)

    def test_help(self):
        assert parser.help_print() == parser.parser("help")

    def test_map(self):
        assert inter.map_printer() == parser.parser("map")

    def test_about(self):
        assert parser.about_print() == parser.parser("about")
