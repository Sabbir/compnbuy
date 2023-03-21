import React from "react";
import { FacebookShareButton, FacebookIcon } from 'react-share';
class Footer extends React.Component {
  render() {
    return(
      <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
        <div className="container flex px-3 py-8 ">
          <div className="w-full mx-auto flex flex-wrap">
            <div className="flex w-full lg:w-1/2 ">
              <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-900">About</h3>
                <p className="py-4">
                  Compare prices among several countries leading eCommerce site.
                </p>
                <p>&copy; compnbuy {(new Date().getFullYear())}</p>
              </div>
            </div>
            <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
              <div className="px-3 md:px-0">
                <h3 className="font-bold text-gray-800">Social</h3>
                <div>
              <FacebookShareButton
                  url={'https://www.comp-nbuy.com'}
                  quote={'Dummy text!'}
                  hashtag="#compnbuy"
              >
                <FacebookIcon size={36} round />
                  </FacebookShareButton>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;