import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:shimmer/shimmer.dart';

class CachedImageWithShimmer extends StatelessWidget {
  final String imageUrl;
  final double? width;
  final double? height;
  final BoxFit fit;
  final BorderRadius? borderRadius;
  final Color? placeholderColor;
  final Color? errorColor;
  final Widget? errorWidget;

  const CachedImageWithShimmer({
    super.key,
    required this.imageUrl,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
    this.placeholderColor,
    this.errorColor,
    this.errorWidget,
  });

  @override
  Widget build(BuildContext context) {
    final placeholder = Shimmer.fromColors(
      baseColor: Colors.grey[900]!,
      highlightColor: Colors.grey[800]!,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: placeholderColor ?? Colors.grey[900],
          borderRadius: borderRadius,
        ),
      ),
    );

    final image = CachedNetworkImage(
      imageUrl: imageUrl,
      width: width,
      height: height,
      fit: fit,
      placeholder: (context, url) => placeholder,
      errorWidget: (context, url, error) {
        if (errorWidget != null) {
          return errorWidget!;
        }
        return Container(
          width: width,
          height: height,
          decoration: BoxDecoration(
            color: errorColor ?? Colors.grey[800],
            borderRadius: borderRadius,
          ),
          child: const Icon(
            Icons.image_not_supported,
            color: Colors.white54,
            size: 40,
          ),
        );
      },
      memCacheWidth: width != null ? width!.toInt() : null,
      memCacheHeight: height != null ? height!.toInt() : null,
    );

    if (borderRadius != null) {
      return ClipRRect(
        borderRadius: borderRadius!,
        child: image,
      );
    }

    return image;
  }
}

