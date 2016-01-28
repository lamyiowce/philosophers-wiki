#!/usr/bin/perl
use warnings;
use strict;
#use JSON::MaybeXS;
use JSON;
use utf8;

sub trim($)
{
	my $string = shift;
	$string =~ s/^\s+//;
	$string =~ s/\s+$//;
	return $string;
}

binmode(STDOUT, ":encoding(UTF-8)");

my $input;
my $filename = "whole.xml";
my $encoding = ":encoding(UTF-8)";
open ($input, "< $encoding", $filename) or die "Nie mozna otworzyc pliku.";
my @lines = <$input>;

my $output;
my $outname = "infoboxes.txt";
open ($output, "> $encoding", $outname) or die "Nie mozna utworzyc pliku";

my $jsonout;
my $jsonname = "info.json";
open ($jsonout, "> $encoding", $jsonname) or die "Nie mozna utworzyc pliku";
my $json_text='';

my $temp = "";
foreach (@lines) {
	 $temp = $temp.$_;
}

my @infs;
my @infd;
my @pages = split /\<page\>/, $temp;


print $jsonout '{ "philosophers":'."\n".'[';

foreach (@pages) {
	if (/(\{\{Infobox philosopher\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*)/ ){
		my @temp = split "\n", $1;
		my $name = '';
		
		foreach my $line (@temp) {
			if ($line =~ /name\s*\=(.+)/ and length($line) < 50 and length($line) > 0 and $line !~ /\_name\s*\=(.+)/) {
				$name = trim($1);
			}
			if (length($name) > 0 and $line =~ /influences\s*\=(.+)/ and length($line) > 0) {
				@infs = ($line =~ /\[\[(.+?)\]\]/g);
				foreach my $inf (@infs) {
					$inf =~ s/\|.*//;

				}
			}

			if (length($name) > 0 and $line =~ /influenced\s*\=(.+)/ and length($line) > 0) {
				@infd = ($line =~ /\[\[(.+?)\]\]/g);
				foreach my $inf (@infd) {
					$inf =~ s/\|.*//;
				}
			}
		}
		if (length($name) > 0) {
			my $wikilink = $name;
			$wikilink =~ s/\s/\_/;
			$wikilink = "https://en.wikipedia.org/wiki/".$wikilink;

		#	$json_text->canonical(1);

			if (length($json_text)>0) {
				$json_text = $json_text.",\n".to_json({name => $name, influenced => \@infd, influences => \@infs, wikilink =>  $wikilink});
			}
			else {
				$json_text = to_json({name => $name, influenced => \@infd, influences => \@infs, wikilink =>  $wikilink});
			}
			#print $jsonout $json_text.",\n";
		}
		print $output "$1\n";	
	}
}
print $jsonout $json_text;
print $jsonout "]\n}";