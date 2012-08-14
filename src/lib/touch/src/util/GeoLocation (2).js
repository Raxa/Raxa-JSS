  


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Raxa-JSS/src/lib/touch/src/util/GeoLocation.js at master · Raxa/Raxa-JSS</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

    
    

    <meta content="authenticity_token" name="csrf-param" />
<meta content="HgsA2DFuioga0SFkdTVft+5cRNvQSb8OHrG0OlWNn68=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github-4f06bfcb765482de148632653957dde1423a93fc.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github2-277183b6724249eea8a7d10300542831eac78d3f.css" media="screen" rel="stylesheet" type="text/css" />
    
    


    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/frameworks-a450c7f907bdc1ee6b362ab1ecca811c761fd259.js" type="text/javascript"></script>
    
    <script defer="defer" src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/github-432f9cc5e3cf625de5dee56ca808a512ad24cbac.js" type="text/javascript"></script>
    
    

      <link rel='permalink' href='/Raxa/Raxa-JSS/blob/29f0ac04639f7a6e947892943850cf311c5baa9e/src/lib/touch/src/util/GeoLocation.js'>
    <meta property="og:title" content="Raxa-JSS"/>
    <meta property="og:type" content="githubog:gitrepository"/>
    <meta property="og:url" content="https://github.com/Raxa/Raxa-JSS"/>
    <meta property="og:image" content="https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-140.png?1329921026"/>
    <meta property="og:site_name" content="GitHub"/>
    <meta property="og:description" content="Raxa-JSS - An open source Health information System (&quot;Raxa&quot;) designed to be implemented at Jan Swasthya Sahyog (JSS)"/>

    <meta name="description" content="Raxa-JSS - An open source Health information System (&quot;Raxa&quot;) designed to be implemented at Jan Swasthya Sahyog (JSS)" />

  <link href="https://github.com/Raxa/Raxa-JSS/commits/master.atom" rel="alternate" title="Recent Commits to Raxa-JSS:master" type="application/atom+xml" />

  </head>


  <body class="logged_in page-blob windows vis-public env-production " data-blob-contribs-enabled="yes">
    <div id="wrapper">

    
    
    

      <div id="header" class="true clearfix">
        <div class="container clearfix">
          <a class="site-logo" href="https://github.com/">
            <!--[if IE]>
            <img alt="GitHub" class="github-logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7.png?1329921026" />
            <img alt="GitHub" class="github-logo-hover" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7-hover.png?1329921026" />
            <![endif]-->
            <img alt="GitHub" class="github-logo-4x" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x.png?1337118071" />
            <img alt="GitHub" class="github-logo-4x-hover" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x-hover.png?1337118071" />
          </a>

              
    <div class="topsearch  ">
        <form accept-charset="UTF-8" action="/search" id="top_search_form" method="get">
  <a href="/search" class="advanced-search tooltipped downwards" title="Advanced Search"><span class="mini-icon mini-icon-advanced-search"></span></a>
  <div class="search placeholder-field js-placeholder-field">
    <input type="text" class="search my_repos_autocompleter" id="global-search-field" name="q" results="5" spellcheck="false" autocomplete="off" data-autocomplete="my-repos-autocomplete" placeholder="Search&hellip;" data-hotkey="s" />
    <div id="my-repos-autocomplete" class="autocomplete-results">
      <ul class="js-navigation-container"></ul>
    </div>
    <input type="submit" value="Search" class="button">
    <span class="mini-icon mini-icon-search-input"></span>
  </div>
  <input type="hidden" name="type" value="Everything" />
  <input type="hidden" name="repo" value="" />
  <input type="hidden" name="langOverride" value="" />
  <input type="hidden" name="start_value" value="1" />
</form>

      <ul class="top-nav">
          <li class="explore"><a href="https://github.com/explore">Explore</a></li>
          <li><a href="https://gist.github.com">Gist</a></li>
          <li><a href="/blog">Blog</a></li>
        <li><a href="http://help.github.com">Help</a></li>
      </ul>
    </div>


            


  <div id="userbox">
    <div id="user">
      <a href="https://github.com/shivamshah"><img height="20" src="https://secure.gravatar.com/avatar/1037e224ac428af8ce66b4830068ba40?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
      <a href="https://github.com/shivamshah" class="name">shivamshah</a>
    </div>
    <ul id="user-links">
      <li>
        <a href="/new" id="new_repo" class="tooltipped downwards" title="Create a New Repo"><span class="mini-icon mini-icon-create"></span></a>
      </li>
      <li>
        <a href="/inbox/notifications" id="notifications" class="tooltipped downwards" title="Notifications">
          <span class="mini-icon mini-icon-notifications"></span>
          <span class="unread_count">55</span>
        </a>
      </li>
      <li>
        <a href="/settings/profile" id="settings" 
          class="tooltipped downwards" 
          title="Account Settings ">
          <span class="mini-icon mini-icon-account-settings"></span>
        </a>
      </li>
      <li>
          <a href="/logout" data-method="post" id="logout" class="tooltipped downwards" title="Log Out">
            <span class="mini-icon mini-icon-logout"></span>
          </a>
      </li>
    </ul>
  </div>



          
        </div>
      </div>

      

            <div class="site hfeed" itemscope itemtype="http://schema.org/WebPage">
      <div class="container hentry">
        <div class="pagehead repohead instapaper_ignore readability-menu">
        <div class="title-actions-bar">
          



              <ul class="pagehead-actions">



          <li class="js-toggler-container js-social-container watch-button-container on">
            <span class="watch-button"><a href="/Raxa/Raxa-JSS/toggle_watch" class="minibutton btn-watch js-toggler-target lighter" data-remote="true" data-method="post" rel="nofollow"><span class="icon"></span> Watch</a><a class="social-count js-social-count" href="/Raxa/Raxa-JSS/watchers">57</a></span>
            <span class="unwatch-button"><a href="/Raxa/Raxa-JSS/toggle_watch" class="minibutton btn-unwatch js-toggler-target lighter" data-remote="true" data-method="post" rel="nofollow"><span class="icon"></span> Unwatch</a><a class="social-count js-social-count" href="/Raxa/Raxa-JSS/watchers">57</a></span>
          </li>

              <li>
                <a href="/shivamshah/Raxa-JSS" class="minibutton btn-fork js-toggler-target lighter" rel="nofollow"><span class="icon"></span> Your Fork</a><a href="/Raxa/Raxa-JSS/network" class="social-count">47</a>
              </li>


    </ul>

          <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
            <span class="repo-label"><span>public</span></span>
            <span class="mega-icon mega-icon-public-repo"></span>
            <span class="author vcard">
<a href="/Raxa" class="url fn" itemprop="url" rel="author">              <span itemprop="title">Raxa</span>
              </a></span> /
            <strong><a href="/Raxa/Raxa-JSS" class="js-current-repository">Raxa-JSS</a></strong>
          </h1>
        </div>

          

  <ul class="tabs">
    <li><a href="/Raxa/Raxa-JSS" class="selected" highlight="repo_sourcerepo_downloadsrepo_commitsrepo_tagsrepo_branches">Code</a></li>
    <li><a href="/Raxa/Raxa-JSS/network" highlight="repo_network">Network</a>
    <li><a href="/Raxa/Raxa-JSS/pulls" highlight="repo_pulls">Pull Requests <span class='counter'>9</span></a></li>

      <li><a href="/Raxa/Raxa-JSS/issues" highlight="repo_issues">Issues <span class='counter'>9</span></a></li>

      <li><a href="/Raxa/Raxa-JSS/wiki" highlight="repo_wiki">Wiki</a></li>

    <li><a href="/Raxa/Raxa-JSS/graphs" highlight="repo_graphsrepo_contributors">Graphs</a></li>

  </ul>
 
<div class="frame frame-center tree-finder" style="display:none"
      data-tree-list-url="/Raxa/Raxa-JSS/tree-list/29f0ac04639f7a6e947892943850cf311c5baa9e"
      data-blob-url-prefix="/Raxa/Raxa-JSS/blob/29f0ac04639f7a6e947892943850cf311c5baa9e"
    >

  <div class="breadcrumb">
    <span class="bold"><a href="/Raxa/Raxa-JSS">Raxa-JSS</a></span> /
    <input class="tree-finder-input js-navigation-enable" type="text" name="query" autocomplete="off" spellcheck="false">
  </div>

    <div class="octotip">
      <p>
        <a href="/Raxa/Raxa-JSS/dismiss-tree-finder-help" class="dismiss js-dismiss-tree-list-help" title="Hide this notice forever" rel="nofollow">Dismiss</a>
        <span class="bold">Octotip:</span> You've activated the <em>file finder</em>
        by pressing <span class="kbd">t</span> Start typing to filter the
        file list. Use <span class="kbd badmono">↑</span> and
        <span class="kbd badmono">↓</span> to navigate,
        <span class="kbd">enter</span> to view files.
      </p>
    </div>

  <table class="tree-browser" cellpadding="0" cellspacing="0">
    <tr class="js-header"><th>&nbsp;</th><th>name</th></tr>
    <tr class="js-no-results no-results" style="display: none">
      <th colspan="2">No matching files</th>
    </tr>
    <tbody class="js-results-list js-navigation-container">
    </tbody>
  </table>
</div>

<div id="jump-to-line" style="display:none">
  <h2>Jump to Line</h2>
  <form accept-charset="UTF-8">
    <input class="textfield" type="text">
    <div class="full-button">
      <button type="submit" class="classy">
        <span>Go</span>
      </button>
    </div>
  </form>
</div>


<div class="subnav-bar">

  <ul class="actions subnav">
    <li><a href="/Raxa/Raxa-JSS/tags" class="blank" highlight="repo_tags">Tags <span class="counter">0</span></a></li>
    <li><a href="/Raxa/Raxa-JSS/downloads" class="blank downloads-blank" highlight="repo_downloads">Downloads <span class="counter">0</span></a></li>
    
  </ul>

  <ul class="scope">
    <li class="switcher">

      <div class="context-menu-container js-menu-container js-context-menu">
        <a href="#"
           class="minibutton bigger switcher js-menu-target js-commitish-button btn-branch repo-tree"
           data-hotkey="w"
           data-master-branch="master"
           data-ref="master">
           <span><span class="icon"></span><i>branch:</i> master</span>
        </a>

        <div class="context-pane commitish-context js-menu-content">
          <a href="javascript:;" class="close js-menu-close"><span class="mini-icon mini-icon-remove-close"></span></a>
          <div class="context-title">Switch Branches/Tags</div>
          <div class="context-body pane-selector commitish-selector js-navigation-container">
            <div class="filterbar">
              <input type="text" id="context-commitish-filter-field" class="js-navigation-enable" placeholder="Filter branches/tags" data-filterable />

              <ul class="tabs">
                <li><a href="#" data-filter="branches" class="selected">Branches</a></li>
                <li><a href="#" data-filter="tags">Tags</a></li>
              </ul>
            </div>

            <div class="js-filter-tab js-filter-branches" data-filterable-for="context-commitish-filter-field">
              <div class="no-results js-not-filterable">Nothing to show</div>
                <div class="commitish-item branch-commitish selector-item js-navigation-item js-navigation-target">
                  <h4>
                      <a href="/Raxa/Raxa-JSS/blob/DataMigration/src/lib/touch/src/util/GeoLocation.js" class="js-navigation-open" data-name="DataMigration" rel="nofollow">DataMigration</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item js-navigation-item js-navigation-target">
                  <h4>
                      <a href="/Raxa/Raxa-JSS/blob/master/src/lib/touch/src/util/GeoLocation.js" class="js-navigation-open" data-name="master" rel="nofollow">master</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item js-navigation-item js-navigation-target">
                  <h4>
                      <a href="/Raxa/Raxa-JSS/blob/RAXAJSS-43/src/lib/touch/src/util/GeoLocation.js" class="js-navigation-open" data-name="RAXAJSS-43" rel="nofollow">RAXAJSS-43</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item js-navigation-item js-navigation-target">
                  <h4>
                      <a href="/Raxa/Raxa-JSS/blob/webservices.forms/src/lib/touch/src/util/GeoLocation.js" class="js-navigation-open" data-name="webservices.forms" rel="nofollow">webservices.forms</a>
                  </h4>
                </div>
            </div>

            <div class="js-filter-tab js-filter-tags" style="display:none" data-filterable-for="context-commitish-filter-field">
              <div class="no-results js-not-filterable">Nothing to show</div>
            </div>
          </div>
        </div><!-- /.commitish-context-context -->
      </div>

    </li>
  </ul>

  <ul class="subnav with-scope">

    <li><a href="/Raxa/Raxa-JSS" class="selected" highlight="repo_source">Files</a></li>
    <li><a href="/Raxa/Raxa-JSS/commits/master" highlight="repo_commits">Commits</a></li>
    <li><a href="/Raxa/Raxa-JSS/branches" class="" highlight="repo_branches" rel="nofollow">Branches <span class="counter">4</span></a></li>
  </ul>

</div>

  
  
  


          

        </div><!-- /.repohead -->

        





<!-- block_view_fragment_key: views10/v8/blob:v21:3c17c95d4fb49543ec4c4567d5bee9c4 -->
  <div id="slider">

    <div class="breadcrumb" data-path="src/lib/touch/src/util/GeoLocation.js/">
      <b itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/Raxa/Raxa-JSS/tree/29f0ac04639f7a6e947892943850cf311c5baa9e" class="js-rewrite-sha" itemprop="url"><span itemprop="title">Raxa-JSS</span></a></b> / <span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/Raxa/Raxa-JSS/tree/29f0ac04639f7a6e947892943850cf311c5baa9e/src" class="js-rewrite-sha" itemscope="url"><span itemprop="title">src</span></a></span> / <span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/Raxa/Raxa-JSS/tree/29f0ac04639f7a6e947892943850cf311c5baa9e/src/lib" class="js-rewrite-sha" itemscope="url"><span itemprop="title">lib</span></a></span> / <span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/Raxa/Raxa-JSS/tree/29f0ac04639f7a6e947892943850cf311c5baa9e/src/lib/touch" class="js-rewrite-sha" itemscope="url"><span itemprop="title">touch</span></a></span> / <span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/Raxa/Raxa-JSS/tree/29f0ac04639f7a6e947892943850cf311c5baa9e/src/lib/touch/src" class="js-rewrite-sha" itemscope="url"><span itemprop="title">src</span></a></span> / <span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/Raxa/Raxa-JSS/tree/29f0ac04639f7a6e947892943850cf311c5baa9e/src/lib/touch/src/util" class="js-rewrite-sha" itemscope="url"><span itemprop="title">util</span></a></span> / <strong class="final-path">GeoLocation.js</strong> <span class="js-clippy mini-icon mini-icon-clippy " data-clipboard-text="src/lib/touch/src/util/GeoLocation.js" data-copied-hint="copied!" data-copy-hint="copy to clipboard"></span>
    </div>


      <div class="commit file-history-tease" data-path="src/lib/touch/src/util/GeoLocation.js/">
        <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/1f8104aa5e00f8947b48f768588596a3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
        <span class="author"><a href="/sunbiz">sunbiz</a></span>
        <time class="js-relative-date" datetime="2012-04-26T05:15:16-07:00" title="2012-04-26 05:15:16">April 26, 2012</time>
        <div class="commit-title">
            <a href="/Raxa/Raxa-JSS/commit/7d1ac12b2a4fff14858fad0f54d18b1428ffc46a" class="message">RAXAJSS-91 - Upgrading to Sencha Touch 2.0.1 and ExtJS 4.1 final rele…</a>
        </div>

        <div class="participation">
          <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>1</strong> contributor</a></p>
          
        </div>
        <div id="blob_contributors_box" style="display:none">
          <h2>Users on GitHub who have contributed to this file</h2>
          <ul class="facebox-user-list">
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/1f8104aa5e00f8947b48f768588596a3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/sunbiz">sunbiz</a>
            </li>
          </ul>
        </div>
      </div>

    <div class="frames">
      <div class="frame frame-center" data-path="src/lib/touch/src/util/GeoLocation.js/" data-permalink-url="/Raxa/Raxa-JSS/blob/29f0ac04639f7a6e947892943850cf311c5baa9e/src/lib/touch/src/util/GeoLocation.js" data-title="Raxa-JSS/src/lib/touch/src/util/GeoLocation.js at master · Raxa/Raxa-JSS · GitHub" data-type="blob">

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><b class="mini-icon mini-icon-text-file"></b></span>
                <span class="mode" title="File Mode">100644</span>
                  <span>389 lines (346 sloc)</span>
                <span>14.754 kb</span>
              </div>
              <ul class="button-group actions">
                  <li>
                    <a class="grouped-button file-edit-link minibutton bigger lighter js-rewrite-sha" href="/Raxa/Raxa-JSS/edit/29f0ac04639f7a6e947892943850cf311c5baa9e/src/lib/touch/src/util/GeoLocation.js" data-method="post" rel="nofollow" data-hotkey="e">Edit this file</a>
                  </li>

                <li>
                  <a href="/Raxa/Raxa-JSS/raw/master/src/lib/touch/src/util/GeoLocation.js" class="minibutton btn-raw grouped-button bigger lighter" id="raw-url"><span class="icon"></span>Raw</a>
                </li>
                  <li>
                    <a href="/Raxa/Raxa-JSS/blame/master/src/lib/touch/src/util/GeoLocation.js" class="minibutton btn-blame grouped-button bigger lighter"><span class="icon"></span>Blame</a>
                  </li>
                <li>
                  <a href="/Raxa/Raxa-JSS/commits/master/src/lib/touch/src/util/GeoLocation.js" class="minibutton btn-history grouped-button bigger lighter" rel="nofollow"><span class="icon"></span>History</a>
                </li>
              </ul>
            </div>
              <div class="data type-javascript">
      <table cellpadding="0" cellspacing="0" class="lines">
        <tr>
          <td>
            <pre class="line_numbers"><span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>
<span id="L272" rel="#L272">272</span>
<span id="L273" rel="#L273">273</span>
<span id="L274" rel="#L274">274</span>
<span id="L275" rel="#L275">275</span>
<span id="L276" rel="#L276">276</span>
<span id="L277" rel="#L277">277</span>
<span id="L278" rel="#L278">278</span>
<span id="L279" rel="#L279">279</span>
<span id="L280" rel="#L280">280</span>
<span id="L281" rel="#L281">281</span>
<span id="L282" rel="#L282">282</span>
<span id="L283" rel="#L283">283</span>
<span id="L284" rel="#L284">284</span>
<span id="L285" rel="#L285">285</span>
<span id="L286" rel="#L286">286</span>
<span id="L287" rel="#L287">287</span>
<span id="L288" rel="#L288">288</span>
<span id="L289" rel="#L289">289</span>
<span id="L290" rel="#L290">290</span>
<span id="L291" rel="#L291">291</span>
<span id="L292" rel="#L292">292</span>
<span id="L293" rel="#L293">293</span>
<span id="L294" rel="#L294">294</span>
<span id="L295" rel="#L295">295</span>
<span id="L296" rel="#L296">296</span>
<span id="L297" rel="#L297">297</span>
<span id="L298" rel="#L298">298</span>
<span id="L299" rel="#L299">299</span>
<span id="L300" rel="#L300">300</span>
<span id="L301" rel="#L301">301</span>
<span id="L302" rel="#L302">302</span>
<span id="L303" rel="#L303">303</span>
<span id="L304" rel="#L304">304</span>
<span id="L305" rel="#L305">305</span>
<span id="L306" rel="#L306">306</span>
<span id="L307" rel="#L307">307</span>
<span id="L308" rel="#L308">308</span>
<span id="L309" rel="#L309">309</span>
<span id="L310" rel="#L310">310</span>
<span id="L311" rel="#L311">311</span>
<span id="L312" rel="#L312">312</span>
<span id="L313" rel="#L313">313</span>
<span id="L314" rel="#L314">314</span>
<span id="L315" rel="#L315">315</span>
<span id="L316" rel="#L316">316</span>
<span id="L317" rel="#L317">317</span>
<span id="L318" rel="#L318">318</span>
<span id="L319" rel="#L319">319</span>
<span id="L320" rel="#L320">320</span>
<span id="L321" rel="#L321">321</span>
<span id="L322" rel="#L322">322</span>
<span id="L323" rel="#L323">323</span>
<span id="L324" rel="#L324">324</span>
<span id="L325" rel="#L325">325</span>
<span id="L326" rel="#L326">326</span>
<span id="L327" rel="#L327">327</span>
<span id="L328" rel="#L328">328</span>
<span id="L329" rel="#L329">329</span>
<span id="L330" rel="#L330">330</span>
<span id="L331" rel="#L331">331</span>
<span id="L332" rel="#L332">332</span>
<span id="L333" rel="#L333">333</span>
<span id="L334" rel="#L334">334</span>
<span id="L335" rel="#L335">335</span>
<span id="L336" rel="#L336">336</span>
<span id="L337" rel="#L337">337</span>
<span id="L338" rel="#L338">338</span>
<span id="L339" rel="#L339">339</span>
<span id="L340" rel="#L340">340</span>
<span id="L341" rel="#L341">341</span>
<span id="L342" rel="#L342">342</span>
<span id="L343" rel="#L343">343</span>
<span id="L344" rel="#L344">344</span>
<span id="L345" rel="#L345">345</span>
<span id="L346" rel="#L346">346</span>
<span id="L347" rel="#L347">347</span>
<span id="L348" rel="#L348">348</span>
<span id="L349" rel="#L349">349</span>
<span id="L350" rel="#L350">350</span>
<span id="L351" rel="#L351">351</span>
<span id="L352" rel="#L352">352</span>
<span id="L353" rel="#L353">353</span>
<span id="L354" rel="#L354">354</span>
<span id="L355" rel="#L355">355</span>
<span id="L356" rel="#L356">356</span>
<span id="L357" rel="#L357">357</span>
<span id="L358" rel="#L358">358</span>
<span id="L359" rel="#L359">359</span>
<span id="L360" rel="#L360">360</span>
<span id="L361" rel="#L361">361</span>
<span id="L362" rel="#L362">362</span>
<span id="L363" rel="#L363">363</span>
<span id="L364" rel="#L364">364</span>
<span id="L365" rel="#L365">365</span>
<span id="L366" rel="#L366">366</span>
<span id="L367" rel="#L367">367</span>
<span id="L368" rel="#L368">368</span>
<span id="L369" rel="#L369">369</span>
<span id="L370" rel="#L370">370</span>
<span id="L371" rel="#L371">371</span>
<span id="L372" rel="#L372">372</span>
<span id="L373" rel="#L373">373</span>
<span id="L374" rel="#L374">374</span>
<span id="L375" rel="#L375">375</span>
<span id="L376" rel="#L376">376</span>
<span id="L377" rel="#L377">377</span>
<span id="L378" rel="#L378">378</span>
<span id="L379" rel="#L379">379</span>
<span id="L380" rel="#L380">380</span>
<span id="L381" rel="#L381">381</span>
<span id="L382" rel="#L382">382</span>
<span id="L383" rel="#L383">383</span>
<span id="L384" rel="#L384">384</span>
<span id="L385" rel="#L385">385</span>
<span id="L386" rel="#L386">386</span>
<span id="L387" rel="#L387">387</span>
<span id="L388" rel="#L388">388</span>
</pre>
          </td>
          <td width="100%">
                <div class="highlight"><pre><div class='line' id='LC1'><span class="cm">/**</span></div><div class='line' id='LC2'><span class="cm"> * Provides a cross browser class for retrieving location information.</span></div><div class='line' id='LC3'><span class="cm"> *</span></div><div class='line' id='LC4'><span class="cm"> * Based on the [Geolocation API Specification](http://dev.w3.org/geo/api/spec-source.html)</span></div><div class='line' id='LC5'><span class="cm"> *</span></div><div class='line' id='LC6'><span class="cm"> * When instantiated, by default this class immediately begins tracking location information,</span></div><div class='line' id='LC7'><span class="cm"> * firing a {@link #locationupdate} event when new location information is available.  To disable this</span></div><div class='line' id='LC8'><span class="cm"> * location tracking (which may be battery intensive on mobile devices), set {@link #autoUpdate} to false.</span></div><div class='line' id='LC9'><span class="cm"> *</span></div><div class='line' id='LC10'><span class="cm"> * When this is done, only calls to {@link #updateLocation} will trigger a location retrieval.</span></div><div class='line' id='LC11'><span class="cm"> *</span></div><div class='line' id='LC12'><span class="cm"> * A {@link #locationerror} event is raised when an error occurs retrieving the location, either due to a user</span></div><div class='line' id='LC13'><span class="cm"> * denying the application access to it, or the browser not supporting it.</span></div><div class='line' id='LC14'><span class="cm"> *</span></div><div class='line' id='LC15'><span class="cm"> * The below code shows a GeoLocation making a single retrieval of location information.</span></div><div class='line' id='LC16'><span class="cm"> *</span></div><div class='line' id='LC17'><span class="cm"> *     var geo = Ext.create(&#39;Ext.util.Geolocation&#39;, {</span></div><div class='line' id='LC18'><span class="cm"> *         autoUpdate: false,</span></div><div class='line' id='LC19'><span class="cm"> *         listeners: {</span></div><div class='line' id='LC20'><span class="cm"> *             locationupdate: function(geo) {</span></div><div class='line' id='LC21'><span class="cm"> *                 alert(&#39;New latitude: &#39; + geo.getLatitude());</span></div><div class='line' id='LC22'><span class="cm"> *             },</span></div><div class='line' id='LC23'><span class="cm"> *             locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {</span></div><div class='line' id='LC24'><span class="cm"> *                 if(bTimeout){</span></div><div class='line' id='LC25'><span class="cm"> *                     alert(&#39;Timeout occurred.&#39;);</span></div><div class='line' id='LC26'><span class="cm"> *                 } else {</span></div><div class='line' id='LC27'><span class="cm"> *                     alert(&#39;Error occurred.&#39;);</span></div><div class='line' id='LC28'><span class="cm"> *                 }</span></div><div class='line' id='LC29'><span class="cm"> *             }</span></div><div class='line' id='LC30'><span class="cm"> *         }</span></div><div class='line' id='LC31'><span class="cm"> *     });</span></div><div class='line' id='LC32'><span class="cm"> *     geo.updateLocation();</span></div><div class='line' id='LC33'><span class="cm"> */</span></div><div class='line' id='LC34'><span class="nx">Ext</span><span class="p">.</span><span class="nx">define</span><span class="p">(</span><span class="s1">&#39;Ext.util.Geolocation&#39;</span><span class="p">,</span> <span class="p">{</span></div><div class='line' id='LC35'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">extend</span><span class="o">:</span> <span class="s1">&#39;Ext.Evented&#39;</span><span class="p">,</span></div><div class='line' id='LC36'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">alternateClassName</span><span class="o">:</span> <span class="p">[</span><span class="s1">&#39;Ext.util.GeoLocation&#39;</span><span class="p">],</span></div><div class='line' id='LC37'><br/></div><div class='line' id='LC38'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">config</span><span class="o">:</span> <span class="p">{</span></div><div class='line' id='LC39'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC40'><span class="cm">         * @event locationerror</span></div><div class='line' id='LC41'><span class="cm">         * Raised when a location retrieval operation failed.&lt;br/&gt;</span></div><div class='line' id='LC42'><span class="cm">         * In the case of calling updateLocation, this event will be raised only once.&lt;br/&gt;</span></div><div class='line' id='LC43'><span class="cm">         * If {@link #autoUpdate} is set to true, this event could be raised repeatedly.</span></div><div class='line' id='LC44'><span class="cm">         * The first error is relative to the moment {@link #autoUpdate} was set to true</span></div><div class='line' id='LC45'><span class="cm">         * (or this {@link Ext.util.Geolocation} was initialized with the {@link #autoUpdate} config option set to true).</span></div><div class='line' id='LC46'><span class="cm">         * Subsequent errors are relative to the moment when the device determines that it&#39;s position has changed.</span></div><div class='line' id='LC47'><span class="cm">         * @param {Ext.util.Geolocation} this</span></div><div class='line' id='LC48'><span class="cm">         * @param {Boolean} timeout</span></div><div class='line' id='LC49'><span class="cm">         * Boolean indicating a timeout occurred</span></div><div class='line' id='LC50'><span class="cm">         * @param {Boolean} permissionDenied</span></div><div class='line' id='LC51'><span class="cm">         * Boolean indicating the user denied the location request</span></div><div class='line' id='LC52'><span class="cm">         * @param {Boolean} locationUnavailable</span></div><div class='line' id='LC53'><span class="cm">         * Boolean indicating that the location of the device could not be determined.&lt;br/&gt;</span></div><div class='line' id='LC54'><span class="cm">         * For instance, one or more of the location providers used in the location acquisition</span></div><div class='line' id='LC55'><span class="cm">         * process reported an internal error that caused the process to fail entirely.</span></div><div class='line' id='LC56'><span class="cm">         * @param {String} message</span></div><div class='line' id='LC57'><span class="cm">         * An error message describing the details of the error encountered.&lt;br/&gt;</span></div><div class='line' id='LC58'><span class="cm">         * This attribute is primarily intended for debugging and should not be used</span></div><div class='line' id='LC59'><span class="cm">         * directly in an application user interface.</span></div><div class='line' id='LC60'><span class="cm">         */</span></div><div class='line' id='LC61'><br/></div><div class='line' id='LC62'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC63'><span class="cm">         * @event locationupdate</span></div><div class='line' id='LC64'><span class="cm">         * Raised when a location retrieval operation has been completed successfully.</span></div><div class='line' id='LC65'><span class="cm">         * @param {Ext.util.Geolocation} this</span></div><div class='line' id='LC66'><span class="cm">         * Retrieve the current location information from the GeoLocation object by using the read-only</span></div><div class='line' id='LC67'><span class="cm">         * properties latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, and speed.</span></div><div class='line' id='LC68'><span class="cm">         */</span></div><div class='line' id='LC69'><br/></div><div class='line' id='LC70'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC71'><span class="cm">         * @cfg {Boolean} autoUpdate</span></div><div class='line' id='LC72'><span class="cm">         * When set to true, continually monitor the location of the device (beginning immediately)</span></div><div class='line' id='LC73'><span class="cm">         * and fire {@link #locationupdate}/{@link #locationerror} events.</span></div><div class='line' id='LC74'><span class="cm">         */</span></div><div class='line' id='LC75'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">autoUpdate</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC76'><br/></div><div class='line' id='LC77'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC78'><span class="cm">         * @cfg {Number} frequency</span></div><div class='line' id='LC79'><span class="cm">         * The frequency of each update if {@link #autoUpdate} is set to true.</span></div><div class='line' id='LC80'><span class="cm">         */</span></div><div class='line' id='LC81'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">frequency</span><span class="o">:</span> <span class="mi">10000</span><span class="p">,</span></div><div class='line' id='LC82'><br/></div><div class='line' id='LC83'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC84'><span class="cm">         * Read-only property representing the last retrieved</span></div><div class='line' id='LC85'><span class="cm">         * geographical coordinate specified in degrees.</span></div><div class='line' id='LC86'><span class="cm">         * @type Number</span></div><div class='line' id='LC87'><span class="cm">         */</span></div><div class='line' id='LC88'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">latitude</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC89'><br/></div><div class='line' id='LC90'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC91'><span class="cm">         * Read-only property representing the last retrieved</span></div><div class='line' id='LC92'><span class="cm">         * geographical coordinate specified in degrees.</span></div><div class='line' id='LC93'><span class="cm">         * @type Number</span></div><div class='line' id='LC94'><span class="cm">         */</span></div><div class='line' id='LC95'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">longitude</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC96'><br/></div><div class='line' id='LC97'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC98'><span class="cm">         * Read-only property representing the last retrieved</span></div><div class='line' id='LC99'><span class="cm">         * accuracy level of the latitude and longitude coordinates,</span></div><div class='line' id='LC100'><span class="cm">         * specified in meters.&lt;br/&gt;</span></div><div class='line' id='LC101'><span class="cm">         * This will always be a non-negative number.&lt;br/&gt;</span></div><div class='line' id='LC102'><span class="cm">         * This corresponds to a 95% confidence level.</span></div><div class='line' id='LC103'><span class="cm">         * @type Number</span></div><div class='line' id='LC104'><span class="cm">         */</span></div><div class='line' id='LC105'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">accuracy</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC106'><br/></div><div class='line' id='LC107'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC108'><span class="cm">         * Read-only property representing the last retrieved</span></div><div class='line' id='LC109'><span class="cm">         * height of the position, specified in meters above the ellipsoid</span></div><div class='line' id='LC110'><span class="cm">         * &lt;a href=&quot;http://dev.w3.org/geo/api/spec-source.html#ref-wgs&quot;&gt;[WGS84]&lt;/a&gt;.</span></div><div class='line' id='LC111'><span class="cm">         * @type Number</span></div><div class='line' id='LC112'><span class="cm">         */</span></div><div class='line' id='LC113'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">altitude</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC114'><br/></div><div class='line' id='LC115'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC116'><span class="cm">         * Read-only property representing the last retrieved</span></div><div class='line' id='LC117'><span class="cm">         * accuracy level of the altitude coordinate, specified in meters.&lt;br/&gt;</span></div><div class='line' id='LC118'><span class="cm">         * If altitude is not null then this will be a non-negative number.</span></div><div class='line' id='LC119'><span class="cm">         * Otherwise this returns null.&lt;br/&gt;</span></div><div class='line' id='LC120'><span class="cm">         * This corresponds to a 95% confidence level.</span></div><div class='line' id='LC121'><span class="cm">         * @type Number</span></div><div class='line' id='LC122'><span class="cm">         */</span></div><div class='line' id='LC123'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">altitudeAccuracy</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC124'><br/></div><div class='line' id='LC125'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC126'><span class="cm">         * Read-only property representing the last retrieved</span></div><div class='line' id='LC127'><span class="cm">         * direction of travel of the hosting device,</span></div><div class='line' id='LC128'><span class="cm">         * specified in non-negative degrees between 0 and 359,</span></div><div class='line' id='LC129'><span class="cm">         * counting clockwise relative to the true north.&lt;br/&gt;</span></div><div class='line' id='LC130'><span class="cm">         * If speed is 0 (device is stationary), then this returns NaN</span></div><div class='line' id='LC131'><span class="cm">         * @type Number</span></div><div class='line' id='LC132'><span class="cm">         */</span></div><div class='line' id='LC133'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">heading</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC134'><br/></div><div class='line' id='LC135'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC136'><span class="cm">         * Read-only property representing the last retrieved</span></div><div class='line' id='LC137'><span class="cm">         * current ground speed of the device, specified in meters per second.&lt;br/&gt;</span></div><div class='line' id='LC138'><span class="cm">         * If this feature is unsupported by the device, this returns null.&lt;br/&gt;</span></div><div class='line' id='LC139'><span class="cm">         * If the device is stationary, this returns 0,</span></div><div class='line' id='LC140'><span class="cm">         * otherwise it returns a non-negative number.</span></div><div class='line' id='LC141'><span class="cm">         * @type Number</span></div><div class='line' id='LC142'><span class="cm">         */</span></div><div class='line' id='LC143'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">speed</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC144'><br/></div><div class='line' id='LC145'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC146'><span class="cm">         * Read-only property representing when the last retrieved</span></div><div class='line' id='LC147'><span class="cm">         * positioning information was acquired by the device.</span></div><div class='line' id='LC148'><span class="cm">         * @type Date</span></div><div class='line' id='LC149'><span class="cm">         */</span></div><div class='line' id='LC150'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">timestamp</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC151'><br/></div><div class='line' id='LC152'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//PositionOptions interface</span></div><div class='line' id='LC153'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC154'><span class="cm">         * @cfg {Boolean} allowHighAccuracy</span></div><div class='line' id='LC155'><span class="cm">         * When set to true, provide a hint that the application would like to receive</span></div><div class='line' id='LC156'><span class="cm">         * the best possible results. This may result in slower response times or increased power consumption.</span></div><div class='line' id='LC157'><span class="cm">         * The user might also deny this capability, or the device might not be able to provide more accurate</span></div><div class='line' id='LC158'><span class="cm">         * results than if this option was set to false.</span></div><div class='line' id='LC159'><span class="cm">         */</span></div><div class='line' id='LC160'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">allowHighAccuracy</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC161'><br/></div><div class='line' id='LC162'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC163'><span class="cm">         * @cfg {Number} timeout</span></div><div class='line' id='LC164'><span class="cm">         * The maximum number of milliseconds allowed to elapse between a location update operation</span></div><div class='line' id='LC165'><span class="cm">         * and the corresponding {@link #locationupdate} event being raised.  If a location was not successfully</span></div><div class='line' id='LC166'><span class="cm">         * acquired before the given timeout elapses (and no other internal errors have occurred in this interval),</span></div><div class='line' id='LC167'><span class="cm">         * then a {@link #locationerror} event will be raised indicating a timeout as the cause.&lt;br/&gt;</span></div><div class='line' id='LC168'><span class="cm">         * Note that the time that is spent obtaining the user permission is &lt;b&gt;not&lt;/b&gt; included in the period</span></div><div class='line' id='LC169'><span class="cm">         * covered by the timeout.  The timeout attribute only applies to the location acquisition operation.&lt;br/&gt;</span></div><div class='line' id='LC170'><span class="cm">         * In the case of calling updateLocation, the {@link #locationerror} event will be raised only once.&lt;br/&gt;</span></div><div class='line' id='LC171'><span class="cm">         * If {@link #autoUpdate} is set to true, the {@link #locationerror} event could be raised repeatedly.</span></div><div class='line' id='LC172'><span class="cm">         * The first timeout is relative to the moment {@link #autoUpdate} was set to true</span></div><div class='line' id='LC173'><span class="cm">         * (or this {@link Ext.util.Geolocation} was initialized with the {@link #autoUpdate} config option set to true).</span></div><div class='line' id='LC174'><span class="cm">         * Subsequent timeouts are relative to the moment when the device determines that it&#39;s position has changed.</span></div><div class='line' id='LC175'><span class="cm">         */</span></div><div class='line' id='LC176'><br/></div><div class='line' id='LC177'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">timeout</span><span class="o">:</span> <span class="kc">Infinity</span><span class="p">,</span></div><div class='line' id='LC178'><br/></div><div class='line' id='LC179'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC180'><span class="cm">         * @cfg {Number} maximumAge</span></div><div class='line' id='LC181'><span class="cm">         * This option indicates that the application is willing to accept cached location information whose age</span></div><div class='line' id='LC182'><span class="cm">         * is no greater than the specified time in milliseconds. If maximumAge is set to 0, an attempt to retrieve</span></div><div class='line' id='LC183'><span class="cm">         * new location information is made immediately.&lt;br/&gt;</span></div><div class='line' id='LC184'><span class="cm">         * Setting the maximumAge to Infinity returns a cached position regardless of its age.&lt;br/&gt;</span></div><div class='line' id='LC185'><span class="cm">         * If the device does not have cached location information available whose age is no</span></div><div class='line' id='LC186'><span class="cm">         * greater than the specified maximumAge, then it must acquire new location information.&lt;br/&gt;</span></div><div class='line' id='LC187'><span class="cm">         * For example, if location information no older than 10 minutes is required, set this property to 600000.</span></div><div class='line' id='LC188'><span class="cm">         */</span></div><div class='line' id='LC189'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">maximumAge</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC190'><br/></div><div class='line' id='LC191'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// @private</span></div><div class='line' id='LC192'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">provider</span> <span class="o">:</span> <span class="kc">undefined</span></div><div class='line' id='LC193'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC194'><br/></div><div class='line' id='LC195'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">updateMaximumAge</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC196'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">watchOperation</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC197'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">updateWatchOperation</span><span class="p">();</span></div><div class='line' id='LC198'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC199'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC200'><br/></div><div class='line' id='LC201'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">updateTimeout</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC202'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">watchOperation</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC203'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">updateWatchOperation</span><span class="p">();</span></div><div class='line' id='LC204'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC205'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC206'><br/></div><div class='line' id='LC207'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">updateAllowHighAccuracy</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC208'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">watchOperation</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC209'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">updateWatchOperation</span><span class="p">();</span></div><div class='line' id='LC210'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC211'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC212'><br/></div><div class='line' id='LC213'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">applyProvider</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC214'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">Ext</span><span class="p">.</span><span class="nx">feature</span><span class="p">.</span><span class="nx">has</span><span class="p">.</span><span class="nx">Geolocation</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC215'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">config</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC216'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">navigator</span> <span class="o">&amp;&amp;</span> <span class="nx">navigator</span><span class="p">.</span><span class="nx">geolocation</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC217'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">config</span> <span class="o">=</span> <span class="nx">navigator</span><span class="p">.</span><span class="nx">geolocation</span><span class="p">;</span></div><div class='line' id='LC218'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC219'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">google</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC220'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">config</span> <span class="o">=</span> <span class="nx">google</span><span class="p">.</span><span class="nx">gears</span><span class="p">.</span><span class="nx">factory</span><span class="p">.</span><span class="nx">create</span><span class="p">(</span><span class="s1">&#39;beta.geolocation&#39;</span><span class="p">);</span></div><div class='line' id='LC221'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC222'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC223'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC224'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC225'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">fireEvent</span><span class="p">(</span><span class="s1">&#39;locationerror&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="s1">&#39;This device does not support Geolocation.&#39;</span><span class="p">);</span></div><div class='line' id='LC226'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC227'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">config</span><span class="p">;</span></div><div class='line' id='LC228'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC229'><br/></div><div class='line' id='LC230'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">updateAutoUpdate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">newAutoUpdate</span><span class="p">,</span> <span class="nx">oldAutoUpdate</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC231'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">me</span> <span class="o">=</span> <span class="k">this</span><span class="p">,</span></div><div class='line' id='LC232'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">provider</span> <span class="o">=</span> <span class="nx">me</span><span class="p">.</span><span class="nx">getProvider</span><span class="p">();</span></div><div class='line' id='LC233'><br/></div><div class='line' id='LC234'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">oldAutoUpdate</span> <span class="o">&amp;&amp;</span> <span class="nx">provider</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC235'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">clearInterval</span><span class="p">(</span><span class="nx">me</span><span class="p">.</span><span class="nx">watchOperationId</span><span class="p">);</span></div><div class='line' id='LC236'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">watchOperationId</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC237'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC238'><br/></div><div class='line' id='LC239'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">newAutoUpdate</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC240'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">provider</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC241'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">fireEvent</span><span class="p">(</span><span class="s1">&#39;locationerror&#39;</span><span class="p">,</span> <span class="nx">me</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="kc">null</span><span class="p">);</span></div><div class='line' id='LC242'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span><span class="p">;</span></div><div class='line' id='LC243'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC244'><br/></div><div class='line' id='LC245'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">try</span> <span class="p">{</span></div><div class='line' id='LC246'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">updateWatchOperation</span><span class="p">();</span></div><div class='line' id='LC247'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC248'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">catch</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC249'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">fireEvent</span><span class="p">(</span><span class="s1">&#39;locationerror&#39;</span><span class="p">,</span> <span class="nx">me</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="nx">e</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span></div><div class='line' id='LC250'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC251'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC252'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC253'><br/></div><div class='line' id='LC254'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// @private</span></div><div class='line' id='LC255'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">updateWatchOperation</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC256'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">me</span> <span class="o">=</span> <span class="k">this</span><span class="p">,</span></div><div class='line' id='LC257'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">provider</span> <span class="o">=</span> <span class="nx">me</span><span class="p">.</span><span class="nx">getProvider</span><span class="p">();</span></div><div class='line' id='LC258'><br/></div><div class='line' id='LC259'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// The native watchPosition method is currently broken in iOS5...</span></div><div class='line' id='LC260'><br/></div><div class='line' id='LC261'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">me</span><span class="p">.</span><span class="nx">watchOperationId</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC262'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">clearInterval</span><span class="p">(</span><span class="nx">me</span><span class="p">.</span><span class="nx">watchOperationId</span><span class="p">);</span></div><div class='line' id='LC263'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC264'><br/></div><div class='line' id='LC265'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span> <span class="nx">pollPosition</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC266'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">provider</span><span class="p">.</span><span class="nx">getCurrentPosition</span><span class="p">(</span></div><div class='line' id='LC267'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">Ext</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="nx">me</span><span class="p">.</span><span class="nx">fireUpdate</span><span class="p">,</span> <span class="nx">me</span><span class="p">),</span></div><div class='line' id='LC268'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">Ext</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="nx">me</span><span class="p">.</span><span class="nx">fireError</span><span class="p">,</span> <span class="nx">me</span><span class="p">),</span></div><div class='line' id='LC269'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">parseOptions</span><span class="p">()</span></div><div class='line' id='LC270'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">);</span></div><div class='line' id='LC271'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC272'><br/></div><div class='line' id='LC273'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">pollPosition</span><span class="p">();</span></div><div class='line' id='LC274'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">watchOperationId</span> <span class="o">=</span> <span class="nx">setInterval</span><span class="p">(</span><span class="nx">pollPosition</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">getFrequency</span><span class="p">());</span></div><div class='line' id='LC275'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC276'><br/></div><div class='line' id='LC277'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="cm">/**</span></div><div class='line' id='LC278'><span class="cm">     * Executes a onetime location update operation,</span></div><div class='line' id='LC279'><span class="cm">     * raising either a {@link #locationupdate} or {@link #locationerror} event.&lt;br/&gt;</span></div><div class='line' id='LC280'><span class="cm">     * Does not interfere with or restart ongoing location monitoring.</span></div><div class='line' id='LC281'><span class="cm">     * @param {Function} callback</span></div><div class='line' id='LC282'><span class="cm">     * A callback method to be called when the location retrieval has been completed.&lt;br/&gt;</span></div><div class='line' id='LC283'><span class="cm">     * Will be called on both success and failure.&lt;br/&gt;</span></div><div class='line' id='LC284'><span class="cm">     * The method will be passed one parameter, {@link Ext.util.Geolocation} (&lt;b&gt;this&lt;/b&gt; reference),</span></div><div class='line' id='LC285'><span class="cm">     * set to null on failure.</span></div><div class='line' id='LC286'><span class="cm">     * &lt;pre&gt;&lt;code&gt;</span></div><div class='line' id='LC287'><span class="cm">     geo.updateLocation(function (geo) {</span></div><div class='line' id='LC288'><span class="cm">     alert(&#39;Latitude: &#39; + (geo != null ? geo.latitude : &#39;failed&#39;));</span></div><div class='line' id='LC289'><span class="cm">     });</span></div><div class='line' id='LC290'><span class="cm">     &lt;/code&gt;&lt;/pre&gt;</span></div><div class='line' id='LC291'><span class="cm">     * @param {Object} scope (optional)</span></div><div class='line' id='LC292'><span class="cm">     * (optional) The scope (&lt;b&gt;this&lt;/b&gt; reference) in which the handler function is executed.</span></div><div class='line' id='LC293'><span class="cm">     * &lt;b&gt;If omitted, defaults to the object which fired the event.&lt;/b&gt;</span></div><div class='line' id='LC294'><span class="cm">     * &lt;!--positonOptions undocumented param, see W3C spec--&gt;</span></div><div class='line' id='LC295'><span class="cm">     */</span></div><div class='line' id='LC296'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">updateLocation</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">callback</span><span class="p">,</span> <span class="nx">scope</span><span class="p">,</span> <span class="nx">positionOptions</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC297'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">me</span> <span class="o">=</span> <span class="k">this</span><span class="p">,</span></div><div class='line' id='LC298'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">provider</span> <span class="o">=</span> <span class="nx">me</span><span class="p">.</span><span class="nx">getProvider</span><span class="p">();</span></div><div class='line' id='LC299'><br/></div><div class='line' id='LC300'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">failFunction</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">message</span><span class="p">,</span> <span class="nx">error</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC301'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC302'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">fireError</span><span class="p">(</span><span class="nx">error</span><span class="p">);</span></div><div class='line' id='LC303'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC304'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC305'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">fireEvent</span><span class="p">(</span><span class="s1">&#39;locationerror&#39;</span><span class="p">,</span> <span class="nx">me</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="kc">true</span><span class="p">,</span> <span class="nx">message</span><span class="p">);</span></div><div class='line' id='LC306'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC307'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">callback</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC308'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">callback</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">scope</span> <span class="o">||</span> <span class="nx">me</span><span class="p">,</span> <span class="kc">null</span><span class="p">,</span> <span class="nx">me</span><span class="p">);</span> <span class="c1">//last parameter for legacy purposes</span></div><div class='line' id='LC309'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC310'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">};</span></div><div class='line' id='LC311'><br/></div><div class='line' id='LC312'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">provider</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC313'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">failFunction</span><span class="p">(</span><span class="kc">null</span><span class="p">);</span></div><div class='line' id='LC314'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span><span class="p">;</span></div><div class='line' id='LC315'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC316'><br/></div><div class='line' id='LC317'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">try</span> <span class="p">{</span></div><div class='line' id='LC318'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">provider</span><span class="p">.</span><span class="nx">getCurrentPosition</span><span class="p">(</span></div><div class='line' id='LC319'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//success callback</span></div><div class='line' id='LC320'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span><span class="p">(</span><span class="nx">position</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC321'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">fireUpdate</span><span class="p">(</span><span class="nx">position</span><span class="p">);</span></div><div class='line' id='LC322'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">callback</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC323'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">callback</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">scope</span> <span class="o">||</span> <span class="nx">me</span><span class="p">,</span> <span class="nx">me</span><span class="p">,</span> <span class="nx">me</span><span class="p">);</span> <span class="c1">//last parameter for legacy purposes</span></div><div class='line' id='LC324'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC325'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC326'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//error callback</span></div><div class='line' id='LC327'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">function</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC328'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">failFunction</span><span class="p">(</span><span class="kc">null</span><span class="p">,</span> <span class="nx">error</span><span class="p">);</span></div><div class='line' id='LC329'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC330'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">positionOptions</span> <span class="o">||</span> <span class="nx">me</span><span class="p">.</span><span class="nx">parseOptions</span><span class="p">()</span></div><div class='line' id='LC331'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">);</span></div><div class='line' id='LC332'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC333'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">catch</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC334'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">failFunction</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span></div><div class='line' id='LC335'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC336'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC337'><br/></div><div class='line' id='LC338'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// @private</span></div><div class='line' id='LC339'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fireUpdate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">position</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC340'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">me</span> <span class="o">=</span> <span class="k">this</span><span class="p">,</span></div><div class='line' id='LC341'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">coords</span> <span class="o">=</span> <span class="nx">position</span><span class="p">.</span><span class="nx">coords</span><span class="p">;</span></div><div class='line' id='LC342'><br/></div><div class='line' id='LC343'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">position</span> <span class="o">=</span> <span class="nx">position</span><span class="p">;</span></div><div class='line' id='LC344'><br/></div><div class='line' id='LC345'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">setConfig</span><span class="p">({</span></div><div class='line' id='LC346'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">timestamp</span><span class="o">:</span> <span class="nx">position</span><span class="p">.</span><span class="nx">timestamp</span><span class="p">,</span></div><div class='line' id='LC347'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">latitude</span><span class="o">:</span> <span class="nx">coords</span><span class="p">.</span><span class="nx">latitude</span><span class="p">,</span></div><div class='line' id='LC348'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">longitude</span><span class="o">:</span> <span class="nx">coords</span><span class="p">.</span><span class="nx">longitude</span><span class="p">,</span></div><div class='line' id='LC349'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">accuracy</span><span class="o">:</span> <span class="nx">coords</span><span class="p">.</span><span class="nx">accuracy</span><span class="p">,</span></div><div class='line' id='LC350'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">altitude</span><span class="o">:</span> <span class="nx">coords</span><span class="p">.</span><span class="nx">altitude</span><span class="p">,</span></div><div class='line' id='LC351'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">altitudeAccuracy</span><span class="o">:</span> <span class="nx">coords</span><span class="p">.</span><span class="nx">altitudeAccuracy</span><span class="p">,</span></div><div class='line' id='LC352'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">heading</span><span class="o">:</span> <span class="nx">coords</span><span class="p">.</span><span class="nx">heading</span><span class="p">,</span></div><div class='line' id='LC353'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">speed</span><span class="o">:</span> <span class="nx">coords</span><span class="p">.</span><span class="nx">speed</span></div><div class='line' id='LC354'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC355'><br/></div><div class='line' id='LC356'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">me</span><span class="p">.</span><span class="nx">fireEvent</span><span class="p">(</span><span class="s1">&#39;locationupdate&#39;</span><span class="p">,</span> <span class="nx">me</span><span class="p">);</span></div><div class='line' id='LC357'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC358'><br/></div><div class='line' id='LC359'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// @private</span></div><div class='line' id='LC360'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fireError</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC361'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">errorCode</span> <span class="o">=</span> <span class="nx">error</span><span class="p">.</span><span class="nx">code</span><span class="p">;</span></div><div class='line' id='LC362'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">fireEvent</span><span class="p">(</span><span class="s1">&#39;locationerror&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">,</span></div><div class='line' id='LC363'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">errorCode</span> <span class="o">==</span> <span class="nx">error</span><span class="p">.</span><span class="nx">TIMEOUT</span><span class="p">,</span></div><div class='line' id='LC364'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">errorCode</span> <span class="o">==</span> <span class="nx">error</span><span class="p">.</span><span class="nx">PERMISSION_DENIED</span><span class="p">,</span></div><div class='line' id='LC365'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">errorCode</span> <span class="o">==</span> <span class="nx">error</span><span class="p">.</span><span class="nx">POSITION_UNAVAILABLE</span><span class="p">,</span></div><div class='line' id='LC366'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">error</span><span class="p">.</span><span class="nx">message</span> <span class="o">==</span> <span class="kc">undefined</span> <span class="o">?</span> <span class="kc">null</span> <span class="o">:</span> <span class="nx">error</span><span class="p">.</span><span class="nx">message</span></div><div class='line' id='LC367'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">);</span></div><div class='line' id='LC368'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC369'><br/></div><div class='line' id='LC370'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// @private</span></div><div class='line' id='LC371'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">parseOptions</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC372'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">timeout</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">getTimeout</span><span class="p">(),</span></div><div class='line' id='LC373'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ret</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC374'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">maximumAge</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">getMaximumAge</span><span class="p">(),</span></div><div class='line' id='LC375'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">allowHighAccuracy</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">getAllowHighAccuracy</span><span class="p">()</span></div><div class='line' id='LC376'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">};</span></div><div class='line' id='LC377'><br/></div><div class='line' id='LC378'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">//Google doesn&#39;t like Infinity</span></div><div class='line' id='LC379'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">timeout</span> <span class="o">!==</span> <span class="kc">Infinity</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC380'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ret</span><span class="p">.</span><span class="nx">timeout</span> <span class="o">=</span> <span class="nx">timeout</span><span class="p">;</span></div><div class='line' id='LC381'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC382'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">ret</span><span class="p">;</span></div><div class='line' id='LC383'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC384'><br/></div><div class='line' id='LC385'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">destroy</span> <span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC386'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">setAutoUpdate</span><span class="p">(</span><span class="kc">false</span><span class="p">);</span></div><div class='line' id='LC387'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC388'><span class="p">});</span></div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>
      </div>
    </div>

  </div>

<div class="frame frame-loading large-loading-area" style="display:none;" data-tree-list-url="/Raxa/Raxa-JSS/tree-list/29f0ac04639f7a6e947892943850cf311c5baa9e" data-blob-url-prefix="/Raxa/Raxa-JSS/blob/29f0ac04639f7a6e947892943850cf311c5baa9e">
  <img src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-64.gif?1329921026" height="64" width="64">
</div>

      </div>
      <div class="context-overlay"></div>
    </div>

      <div id="footer-push"></div><!-- hack for sticky footer -->
    </div><!-- end of wrapper - hack for sticky footer -->

      <!-- footer -->
      <div id="footer" >
        
  <div class="upper_footer">
     <div class="container clearfix">

       <!--[if IE]><h4 id="blacktocat_ie">GitHub Links</h4><![endif]-->
       <![if !IE]><h4 id="blacktocat">GitHub Links</h4><![endif]>

       <ul class="footer_nav">
         <h4>GitHub</h4>
         <li><a href="https://github.com/about">About</a></li>
         <li><a href="https://github.com/blog">Blog</a></li>
         <li><a href="https://github.com/features">Features</a></li>
         <li><a href="https://github.com/contact">Contact &amp; Support</a></li>
         <li><a href="https://github.com/training">Training</a></li>
         <li><a href="http://enterprise.github.com/">GitHub Enterprise</a></li>
         <li><a href="http://status.github.com/">Site Status</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Tools</h4>
         <li><a href="http://get.gaug.es/">Gauges: Analyze web traffic</a></li>
         <li><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></li>
         <li><a href="https://gist.github.com">Gist: Code snippets</a></li>
         <li><a href="http://mac.github.com/">GitHub for Mac</a></li>
         <li><a href="http://windows.github.com/">GitHub for Windows</a></li>
         <li><a href="http://mobile.github.com/">Issues for iPhone</a></li>
         <li><a href="http://jobs.github.com/">Job Board</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Extras</h4>
         <li><a href="http://shop.github.com/">GitHub Shop</a></li>
         <li><a href="http://octodex.github.com/">The Octodex</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Documentation</h4>
         <li><a href="http://help.github.com/">GitHub Help</a></li>
         <li><a href="http://developer.github.com/">Developer API</a></li>
         <li><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></li>
         <li><a href="http://pages.github.com/">GitHub Pages</a></li>
       </ul>

     </div><!-- /.site -->
  </div><!-- /.upper_footer -->

<div class="lower_footer">
  <div class="container clearfix">
    <!--[if IE]><div id="legal_ie"><![endif]-->
    <![if !IE]><div id="legal"><![endif]>
      <ul>
          <li><a href="https://github.com/site/terms">Terms of Service</a></li>
          <li><a href="https://github.com/site/privacy">Privacy</a></li>
          <li><a href="https://github.com/security">Security</a></li>
      </ul>

      <p>&copy; 2012 <span title="0.08955s from fe14.rs.github.com">GitHub</span> Inc. All rights reserved.</p>
    </div><!-- /#legal or /#legal_ie-->

      <div class="sponsor">
        <a href="http://www.rackspace.com" class="logo">
          <img alt="Dedicated Server" height="36" src="https://a248.e.akamai.net/assets.github.com/images/modules/footer/rackspaces_logo.png?1329921026" width="38" />
        </a>
        Powered by the <a href="http://www.rackspace.com ">Dedicated
        Servers</a> and<br/> <a href="http://www.rackspacecloud.com">Cloud
        Computing</a> of Rackspace Hosting<span>&reg;</span>
      </div>
  </div><!-- /.site -->
</div><!-- /.lower_footer -->

      </div><!-- /#footer -->

    

<div id="keyboard_shortcuts_pane" class="instapaper_ignore readability-extra" style="display:none">
  <h2>Keyboard Shortcuts <small><a href="#" class="js-see-all-keyboard-shortcuts">(see all)</a></small></h2>

  <div class="columns threecols">
    <div class="column first">
      <h3>Site wide shortcuts</h3>
      <dl class="keyboard-mappings">
        <dt>s</dt>
        <dd>Focus site search</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>?</dt>
        <dd>Bring up this help dialog</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column middle" style='display:none'>
      <h3>Commit list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>c <em>or</em> o <em>or</em> enter</dt>
        <dd>Open commit</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>y</dt>
        <dd>Expand URL to its canonical form</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column last" style='display:none'>
      <h3>Pull request list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>o <em>or</em> enter</dt>
        <dd>Open issue</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
        <dd>Submit comment</dd>
      </dl>
    </div><!-- /.columns.last -->

  </div><!-- /.columns.equacols -->

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>x</dt>
          <dd>Toggle selection</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>c</dt>
          <dd>Create issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Create label</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>i</dt>
          <dd>Back to inbox</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>u</dt>
          <dd>Back to issues</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>/</dt>
          <dd>Focus issues search</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues Dashboard</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Network Graph</h3>
    <div class="columns equacols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt><span class="badmono">←</span> <em>or</em> h</dt>
          <dd>Scroll left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">→</span> <em>or</em> l</dt>
          <dd>Scroll right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↑</span> <em>or</em> k</dt>
          <dd>Scroll up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↓</span> <em>or</em> j</dt>
          <dd>Scroll down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Toggle visibility of head labels</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">←</span> <em>or</em> shift h</dt>
          <dd>Scroll all the way left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">→</span> <em>or</em> shift l</dt>
          <dd>Scroll all the way right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↑</span> <em>or</em> shift k</dt>
          <dd>Scroll all the way up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↓</span> <em>or</em> shift j</dt>
          <dd>Scroll all the way down</dd>
        </dl>
      </div><!-- /.column.last -->
    </div>
  </div>

  <div >
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first" >
        <h3>Source Code Browsing</h3>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Activates the file finder</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Jump to line</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>w</dt>
          <dd>Switch branch/tag</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Expand URL to its canonical form</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first">
        <h3>Browsing Commits</h3>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>escape</dt>
          <dd>Close form</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>p</dt>
          <dd>Parent commit</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o</dt>
          <dd>Other parent commit</dd>
        </dl>
      </div>
    </div>
  </div>
</div>

    <div id="markdown-help" class="instapaper_ignore readability-extra">
  <h2>Markdown Cheat Sheet</h2>

  <div class="cheatsheet-content">

  <div class="mod">
    <div class="col">
      <h3>Format Text</h3>
      <p>Headers</p>
      <pre>
# This is an &lt;h1&gt; tag
## This is an &lt;h2&gt; tag
###### This is an &lt;h6&gt; tag</pre>
     <p>Text styles</p>
     <pre>
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__

*You **can** combine them*
</pre>
    </div>
    <div class="col">
      <h3>Lists</h3>
      <p>Unordered</p>
      <pre>
* Item 1
* Item 2
  * Item 2a
  * Item 2b</pre>
     <p>Ordered</p>
     <pre>
1. Item 1
2. Item 2
3. Item 3
   * Item 3a
   * Item 3b</pre>
    </div>
    <div class="col">
      <h3>Miscellaneous</h3>
      <p>Images</p>
      <pre>
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)
</pre>
     <p>Links</p>
     <pre>
http://github.com - automatic!
[GitHub](http://github.com)</pre>
<p>Blockquotes</p>
     <pre>
As Kanye West said:

> We're living the future so
> the present is our past.
</pre>
    </div>
  </div>
  <div class="rule"></div>

  <h3>Code Examples in Markdown</h3>
  <div class="col">
      <p>Syntax highlighting with <a href="http://github.github.com/github-flavored-markdown/" title="GitHub Flavored Markdown" target="_blank">GFM</a></p>
      <pre>
```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```</pre>
    </div>
    <div class="col">
      <p>Or, indent your code 4 spaces</p>
      <pre>
Here is a Python code example
without syntax highlighting:

    def foo:
      if not bar:
        return true</pre>
    </div>
    <div class="col">
      <p>Inline code for comments</p>
      <pre>
I think you should use an
`&lt;addr&gt;` element here instead.</pre>
    </div>
  </div>

  </div>
</div>


    <div id="ajax-error-message">
      <span class="mini-icon mini-icon-exclamation"></span>
      Something went wrong with that request. Please try again.
      <a href="#" class="ajax-error-dismiss">Dismiss</a>
    </div>

    <div id="logo-popup">
      <h2>Looking for the GitHub logo?</h2>
      <ul>
        <li>
          <h4>GitHub Logo</h4>
          <a href="http://github-media-downloads.s3.amazonaws.com/GitHub_Logos.zip"><img alt="Github_logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/about_page/github_logo.png?1329921026" /></a>
          <a href="http://github-media-downloads.s3.amazonaws.com/GitHub_Logos.zip" class="minibutton btn-download download"><span class="icon"></span>Download</a>
        </li>
        <li>
          <h4>The Octocat</h4>
          <a href="http://github-media-downloads.s3.amazonaws.com/Octocats.zip"><img alt="Octocat" src="https://a248.e.akamai.net/assets.github.com/images/modules/about_page/octocat.png?1329921026" /></a>
          <a href="http://github-media-downloads.s3.amazonaws.com/Octocats.zip" class="minibutton btn-download download"><span class="icon"></span>Download</a>
        </li>
      </ul>
    </div>

    
    
    
    <span id='server_response_time' data-time='0.09258' data-host='fe14'></span>
  </body>
</html>

