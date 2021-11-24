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

function extensionCheck(event) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) return;
    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf(".");
    const ext = name.substring(lastDot + 1);
    const extensions = ["png", "jpg", "svg"];
    if (!extensions.includes(ext)) {
        alert("That is not a valid image type. Only PNGs, JPEGs, and SVGs can be uploaded.");
        document.getElementById("file-upload").value = null;
    }
}