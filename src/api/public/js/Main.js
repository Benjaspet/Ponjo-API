/*
 * Copyright © 2021 Ben Petrillo. All rights reserved.
 *
 * Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

(function () {
    const doc = document.documentElement
    doc.classList.remove("no-js")
    doc.classList.add("js")
    if (document.body.classList.contains('has-animations')) {
        const sr = window.sr = ScrollReveal()
        sr.reveal('.feature, .pricing-table-inner', {
            duration: 600,
            distance: '20px',
            easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
            origin: 'bottom',
            interval: 100
        });
        doc.classList.add('anime-ready')
        anime.timeline({
            targets: '.hero-figure-box-05'
        }).add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: [0.05, 0.05],
            scaleY: [0, 1],
            perspective: '500px',
            delay: anime.random(0, 400)
        }).add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: 1
        }).add({
            duration: 800,
            rotateY: '-15deg',
            rotateX: '8deg',
            rotateZ: '-1deg'
        });
        anime.timeline({
            targets: '.hero-figure-box-06, .hero-figure-box-07'
        }).add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: [0.05, 0.05],
            scaleY: [0, 1],
            perspective: '500px',
            delay: anime.random(0, 400)
        }).add({
            duration: 400,
            easing: 'easeInOutExpo',
            scaleX: 1
        }).add({
            duration: 800,
            rotateZ: '20deg'
        })
        anime({
            targets: '.hero-figure-box-01, .hero-figure-box-02, .hero-figure-box-03, .hero-figure-box-04, .hero-figure-box-08, .hero-figure-box-09, .hero-figure-box-10',
            duration: anime.random(600, 800),
            delay: anime.random(600, 800),
            rotate: [ anime.random(-360, 360), function (el) { return el.getAttribute('data-rotation') } ],
            scale: [0.7, 1],
            opacity: [0, 1],
            easing: 'easeInOutExpo'
        });
    }
}());