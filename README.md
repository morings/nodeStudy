# Express的学习
<div id="page-doc" markdown="1">
<h1 id="利用-express-托管静态文件">利用 Express 托管静态文件</h1>

<p>为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 <code>express.static</code> 内置中间件函数。</p>

<p>此函数特征如下：</p>

<pre class="  language-javascript"><code class="  language-javascript">express<span class="token punctuation">.</span><span class="token keyword">static</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre>

<p>The <code>root</code> argument specifies the root directory from which to serve static assets.
For more information on the <code>options</code> argument, see <a href="https://www.expressjs.com.cn/4x/api.html#express.static">express.static</a>.</p>

<p>例如，通过如下代码就可以将 <code>public</code> 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：</p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>express<span class="token punctuation">.</span><span class="token keyword">static</span><span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre>

<p>现在，你就可以访问 <code>public</code> 目录中的所有文件了：</p>

<pre><code class="language-plain-text">http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code></pre>

<div class="doc-box doc-info">
Express 在静态目录查找文件，因此，存放静态文件的目录名不会出现在 URL 中。
</div>

<p>如果要使用多个静态资源目录，请多次调用 <code>express.static</code> 中间件函数：</p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>express<span class="token punctuation">.</span><span class="token keyword">static</span><span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>express<span class="token punctuation">.</span><span class="token keyword">static</span><span class="token punctuation">(</span><span class="token string">'files'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre>

<p>访问静态资源文件时，<code>express.static</code> 中间件函数会根据目录的添加顺序查找所需的文件。</p>

<div class="doc-box doc-info">
  <p>注意：For best results, <a href="https://www.expressjs.com.cn/en/advanced/best-practice-performance.html#use-a-reverse-proxy">use a reverse proxy</a> cache to improve performance of serving static assets.</p>
</div>

<p>To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the <code>express.static</code> function, <a href="https://www.expressjs.com.cn/4x/api.html#app.use">specify a mount path</a> for the static directory, as shown below:</p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span><span class="token string">'/static'</span><span class="token punctuation">,</span> express<span class="token punctuation">.</span><span class="token keyword">static</span><span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre>

<p>现在，你就可以通过带有 <code>/static</code> 前缀地址来访问 <code>public</code> 目录中的文件了。</p>

<pre><code class="language-plain-text">http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code></pre>

<p>然而，the path that you provide to the <code>express.static</code> function is relative to the directory from where you launch your <code>node</code> process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:</p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span><span class="token string">'/static'</span><span class="token punctuation">,</span> express<span class="token punctuation">.</span><span class="token keyword">static</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">join<span class="token punctuation">(</span></span>__dirname<span class="token punctuation">,</span> <span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre>

<p>欲了解更多关于 <code>serve-static</code> 函数及其参数的知识，请参考  <a href="https://www.expressjs.com.cn/resources/middleware/serve-static.html">serve-static</a>。</p>

<h3 id="previous-basic-routing-next-faq-"><a href="https://www.expressjs.com.cn/starter/basic-routing.html">Previous: Basic Routing </a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.expressjs.com.cn/starter/faq.html">Next: FAQ </a></h3>

      </div>
