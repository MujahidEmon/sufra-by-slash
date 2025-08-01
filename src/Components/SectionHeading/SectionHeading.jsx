
const SectionHeading = ({heading, subheading}) => {
    return (
        <div className="flex flex-col items-center my-16">
            <p className="text-yellow-500 italic mb-2">--- {subheading} ---</p>
            <h1 className="uppercase text-gray-500 w-fit px-5 py-2 text-3xl border-y-2">{heading}</h1>
        </div>
    );
};

export default SectionHeading;