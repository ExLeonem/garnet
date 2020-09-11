from urllib.parse import urljoin, urlsplit
import os, re
from django.conf import settings
from django.urls import URLPattern, URLResolver, ResolverMatch


urlconf = __import__(settings.ROOT_URLCONF, {}, {}, [''])


def get_hateoas(request, **kwargs):
    """
        Build the hateoas follow up links
    """ 

    current_url = request.build_absolute_uri()
    splitted = urlsplit(request.build_absolute_uri())

    def process_link(link):

        # Process only api paths
        if "api" not in link or "auth" in link:
            return (None, None)

        scheme = splitted[0] # https, ...
        base = splitted[1] # netloc
        path = splitted[2] # url path

        # Split and filter for empty values
        path_split = list(filter(lambda seg: seg != "", path.split("/")))
        link_split = list(filter(lambda seg: seg != "" and seg != "$", link.split("/")))

        _links = {}

        # Lengths only differ in +-1?
        path_len = len(path_split)
        link_len = len(link_split)
        range_len = 0
        if path_len == link_len or path_len-1 == link_len:
            range_len = path_len

        elif path_len == link_len-1:
            range_len = link_len

        else:
            return (None, None)


        # Iterate over individual path segments and compare
        key = ""
        href = ""
        for i in range(range_len):

            path_seg = path_split[i] if i < path_len else None
            link_seg = link_split[i] if i < link_len else None

            # Segment is pattern?
            is_pattern = False
            if link_seg and re.match(r'\(.*\)', link_seg) != None:
                is_pattern = True
            
            # Path segments match up?
            if link_seg and path_seg:
                if path_seg == link_seg or is_pattern:
                    href += "/"+path_seg
                    key = path_seg
                    continue

                return (None, None)

            # Are there any follow up paths?
            if i == link_len-1:
                href += "/"+ ("{0}"if is_pattern else link_seg)
                key = link_seg if not is_pattern else key 

            # Is link the parent?
            if link_len-1 != range_len-1:
                key = "parent"


        # Path is the current url?
        if href == path[:-1]:
            key = "self"

        return (key, url_join(scheme, base, href))

    return {"_links": _build_follow_up(process_link)}



# ---------------------------
# Utilities
# ---------------------------

def url_join(scheme, base, url):

    return urljoin(scheme + "://" + base, url)


def _enumerate_links(lis, acc = None):
    """
        Returns a register pattern as string.
    """
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


def _build_follow_up(acc):

    base = {}
    for pattern in _enumerate_links(urlconf.urlpatterns):
        link = ''.join(pattern)

        (key, value) = acc(link)

        if key != None:
            base[key] = {
                "href": value
            }
        
    
    return base


def fill_template():
    """
        Fills each template with a specific parameter    
    """
