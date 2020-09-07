from urllib.parse import urljoin, urlsplit
import os
from django.conf import settings
from django.urls import URLPattern, URLResolver


urlconf = __import__(settings.ROOT_URLCONF, {}, {}, [''])


def get_hateoas(request, **kwargs):
    """
        Build the hateoas follow up links
    """ 

    current_url = request.build_absolute_uri()
    links = {"self": current_url}
    splitted = urlsplit(request.build_absolute_uri())

    # SplitResult(scheme='http', netloc='localhost:8000', path='/api/bin/type', query='', fragment='')
    # SplitResult(scheme='http', netloc='localhost:8000', path='/api/bin/type/5', query='', fragment='')

    def process_link(link):

        scheme = splitted[0] # https, ...
        base = splitted[1] # netloc
        path = splitted[2] # url path

        # Replace numeric values in patterns
        numeric_parameters = list(filter(lambda seg: isinstance(seg, int), path.split("/")))


        print("------")
        print(path)
        print(link)
        print("------")
        if path[1:] == link[1:]:
            return ("self", {"href": url_join(scheme, base, path)})
        

        return (None, None)
    # ['^auth/']
    # ['api/bin/type/(?P<bin_type>.+)']
    # ['^api/bin/type']
    # ['^api/bin']
    # ['^api/district']

    return {"_links": _build_follow_up(process_link)}


def get_hateoas_template(request):
    """
        Builds a template for generation of multiple 
    """

    def build_follow_up(*args):
        pass

    
    return build_follow_up



# ---------------------------
# Utilities
# ---------------------------


def url_join(scheme, base, url):

    return urljoin(scheme + "://" + base, url)


def _enumerate_links(lis, acc = None):

    if acc is None:
        acc = []
    if not lis:
        return
    l = lis[0]
    
    if isinstance(l, URLPattern):
        yield acc + [str(l.pattern)]

    elif isinstance(l, URLResolver):
        yield from _enumerate_links(l.url_patterns, acc + [str(l.pattern)])

    yield from _enumerate_links(lis[1:], acc)


def _build_follow_up(acc, base = {}):

    for pattern in _enumerate_links(urlconf.urlpatterns):
        link = ''.join(pattern)

        (key, value) = acc(link)

        if key != None:
            base[key] = value
        
    return base